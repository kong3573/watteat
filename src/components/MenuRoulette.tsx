'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem, CountryMode } from '@/types/menu';
import { Sparkles, RefreshCw, X, ShoppingBag, ChefHat, Compass, Award } from 'lucide-react';
import {
  getCoupangSearchUrl,
  getAmazonSearchUrl,
  getCoupangDeeplinkUrl,
  trackAffiliateClick,
  pickWeightedMenuItem,
  recordMenuRouletteWin,
  getAllMenuHistory,
  MenuHistoryItem,
} from '@/lib/affiliate';
import { getAssetPath } from '@/lib/assets';

interface MenuRouletteProps {
  isOpen: boolean;
  onClose: () => void;
  menus: MenuItem[];
  countryMode: CountryMode;
  onSelectMenu: (menu: MenuItem) => void;
}

export const MenuRoulette: React.FC<MenuRouletteProps> = ({
  isOpen,
  onClose,
  menus,
  countryMode,
  onSelectMenu,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MenuItem | null>(null);
  const [displayMenu, setDisplayMenu] = useState<MenuItem | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [history, setHistory] = useState<Record<string, MenuHistoryItem>>({});

  useEffect(() => {
    if (isOpen && menus.length > 0) {
      const hist = getAllMenuHistory();
      setHistory(hist);
      setDisplayMenu(menus[0]);
      setSelectedResult(null);
      setShowCelebration(false);
    }
  }, [isOpen, menus]);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning || menus.length === 0) return;

    setIsSpinning(true);
    setSelectedResult(null);
    setShowCelebration(false);

    // 최신 이력 로드
    const currentHist = getAllMenuHistory();
    setHistory(currentHist);

    // 🎯 가중치 기반 무작위 추첨 (한 번 걸렸던 메뉴는 낮은 확률로 배정)
    const { selected: finalChoice } = pickWeightedMenuItem(menus, currentHist);

    let counter = 0;
    const totalSteps = 22;
    const interval = 70;

    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * menus.length);
      setDisplayMenu(menus[randomIndex]);
      counter++;

      if (counter >= totalSteps) {
        clearInterval(timer);
        setDisplayMenu(finalChoice);
        setSelectedResult(finalChoice);
        setIsSpinning(false);
        setShowCelebration(true);

        // 당첨 이력 기록
        recordMenuRouletteWin(finalChoice.id);
        setHistory(getAllMenuHistory());
      }
    }, interval);
  };

  const handleCoupangClick = async (menu: MenuItem) => {
    if (countryMode === 'KR') {
      const directUrl = getCoupangSearchUrl(menu.coupangMealkitKeyword);
      trackAffiliateClick(menu.id, menu.name, 'mealkit', menu.coupangMealkitKeyword, 'coupang', directUrl);
      const targetUrl = await getCoupangDeeplinkUrl(directUrl);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      const url = getAmazonSearchUrl(menu.amazonMealkitKeyword);
      trackAffiliateClick(menu.id, menu.nameEn, 'mealkit', menu.amazonMealkitKeyword, 'amazon', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // 당첨 메뉴의 이력 통계
  const winCount = selectedResult ? (history[selectedResult.id]?.rouletteCount || 0) : 0;
  const isNewMenu = winCount <= 1; // 이번이 첫 당첨이거나 처음인 경우

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-gray-100 overflow-hidden">
        {/* 축하 이펙트 파티클 */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
            <div className="text-5xl animate-bounce">🎉</div>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 상단 타이틀 & 스마트 추천 배지 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 mb-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
            {countryMode === 'KR' ? '스마트 메뉴 룰렛' : 'Smart Menu Roulette'}
          </h3>
          <div className="inline-flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full mt-1 border border-amber-200">
            <Compass className="w-3 h-3 text-amber-600" />
            <span>이전에 안 먹어본 새로운 메뉴 우선 추천</span>
          </div>
        </div>

        {/* 룰렛 슬롯 디스플레이 */}
        <div className={`bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl p-4 border-2 border-dashed transition-all text-center relative mb-4 ${showCelebration ? 'border-amber-500 bg-amber-50/40' : 'border-amber-300'}`}>
          {displayMenu ? (
            <div className="space-y-2.5">
              <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-inner bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetPath(displayMenu.imageUrl)}
                  alt={displayMenu.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-2.5">
                  <span className="text-xs font-semibold text-white bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    ⏱️ {displayMenu.cookingTimeMinutes}분 완성
                  </span>

                  {selectedResult && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md text-white shadow-xs flex items-center gap-0.5 ${isNewMenu ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                      {isNewMenu ? (
                        <>
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>✨ 처음 맛보는 추천</span>
                        </>
                      ) : (
                        <>
                          <Award className="w-2.5 h-2.5" />
                          <span>이전 당첨 이력 있음</span>
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900">
                  {countryMode === 'KR' ? displayMenu.name : displayMenu.nameEn}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-1 mt-0.5 px-2">
                  {countryMode === 'KR' ? displayMenu.description : displayMenu.descriptionEn}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
              룰렛 버튼을 눌러주세요!
            </div>
          )}
        </div>

        {/* 컨트롤 버튼 */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className={`w-full py-3.5 rounded-2xl font-black text-white text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
              isSpinning
                ? 'bg-amber-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-orange-500/20'
            }`}
          >
            <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? '새로운 메뉴 추첨 중...' : (selectedResult ? '다른 메뉴 다시 돌리기 🎲' : '메뉴 돌리기!')}</span>
          </button>

          {selectedResult && (
            <div className="grid grid-cols-2 gap-2 pt-1 animate-in fade-in">
              <button
                type="button"
                onClick={() => {
                  onSelectMenu(selectedResult);
                  onClose();
                }}
                className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChefHat className="w-4 h-4 text-emerald-600" />
                <span>재료 & 레시피</span>
              </button>

              <button
                type="button"
                onClick={() => handleCoupangClick(selectedResult)}
                className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{countryMode === 'KR' ? '쿠팡 바로구매' : 'Buy on Amazon'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
