'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem, CountryMode } from '@/types/menu';
import {
  X,
  Clock,
  ShoppingCart,
  ExternalLink,
  ChefHat,
  Check,
  Share2,
  Sparkles,
  AlertCircle,
  Copy,
  CheckSquare,
  Square,
  Heart,
  Tv,
  Calendar,
  Truck,
  Package,
} from 'lucide-react';
import {
  getCoupangSearchUrl,
  getAmazonSearchUrl,
  getInstacartSearchUrl,
  getCoupangDeeplinkUrl,
  trackAffiliateClick,
  shareMenuItem,
  getFavoriteMenuIds,
  toggleFavoriteMenuId,
  recordMenuViewHistory,
} from '@/lib/affiliate';
import { getAssetPath } from '@/lib/assets';

interface MenuDetailModalProps {
  menu: MenuItem | null;
  countryMode: CountryMode;
  onClose: () => void;
  onFavoritesChange?: () => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  menu,
  countryMode,
  onClose,
  onFavoritesChange,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedList, setCopiedList] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (menu) {
      setSelectedIngredients(menu.ingredients.map((i) => i.name));
      const favs = getFavoriteMenuIds();
      setIsFav(favs.includes(menu.id));
      recordMenuViewHistory(menu.id);
    }
  }, [menu]);

  if (!menu) return null;

  const isTvFeatured = !!menu.tvFeature;
  const isRocketDelivery = menu.tvFeature ? menu.tvFeature.deliveryType === 'rocket' : true;
  const hasProduct = menu.tvFeature ? menu.tvFeature.hasProductMatch : true;

  const handleToggleFavorite = () => {
    const updated = toggleFavoriteMenuId(menu.id);
    setIsFav(updated.includes(menu.id));
    if (onFavoritesChange) onFavoritesChange();
  };

  const handleToggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSelectAllIngredients = () => {
    if (selectedIngredients.length === menu.ingredients.length) {
      setSelectedIngredients([]);
    } else {
      setSelectedIngredients(menu.ingredients.map((i) => i.name));
    }
  };

  const handleOpenCoupangIngredient = async (ingName: string, keyword: string) => {
    if (countryMode === 'KR') {
      setLoadingAction(`ing-${ingName}`);
      const directUrl = getCoupangSearchUrl(keyword);
      trackAffiliateClick(menu.id, menu.name, 'ingredient', ingName, 'coupang', directUrl);
      const targetUrl = await getCoupangDeeplinkUrl(directUrl);
      setLoadingAction(null);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      const url = getAmazonSearchUrl(keyword);
      trackAffiliateClick(menu.id, menu.nameEn, 'ingredient', ingName, 'amazon', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenMealkit = async () => {
    if (!hasProduct) return;
    if (countryMode === 'KR') {
      setLoadingAction('mealkit');
      const directUrl = getCoupangSearchUrl(menu.coupangMealkitKeyword);
      trackAffiliateClick(menu.id, menu.name, 'mealkit', menu.coupangMealkitKeyword, 'coupang', directUrl);
      const targetUrl = await getCoupangDeeplinkUrl(directUrl);
      setLoadingAction(null);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      const url = getAmazonSearchUrl(menu.amazonMealkitKeyword);
      trackAffiliateClick(menu.id, menu.nameEn, 'mealkit', menu.amazonMealkitKeyword, 'amazon', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenSelectedIngredients = async () => {
    const chosen = menu.ingredients.filter((i) => selectedIngredients.includes(i.name));
    if (chosen.length === 0) return;

    if (countryMode === 'US') {
      const query = chosen.map((i) => i.nameEn).join(' ');
      const url = getInstacartSearchUrl(query || menu.instacartKeyword);
      trackAffiliateClick(menu.id, menu.nameEn, 'all', '선택 식재료 묶음', 'instacart', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const searchBundle = chosen.map((i) => i.coupangKeyword).join(' ');
      const searchKeyword = searchBundle.length > 25 ? `${menu.name} 재료 세트` : searchBundle;
      const directUrl = getCoupangSearchUrl(searchKeyword);
      trackAffiliateClick(menu.id, menu.name, 'all', searchKeyword, 'coupang', directUrl);
      const targetUrl = await getCoupangDeeplinkUrl(directUrl);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyShoppingList = () => {
    const chosen = menu.ingredients.filter((i) => selectedIngredients.includes(i.name));
    const text = `🛒 [${menu.name}] 장보기 목록\n` +
      (menu.tvFeature ? `📺 ${menu.tvFeature.showName} (${menu.tvFeature.broadcastDate} 방영)\n` : '') +
      chosen.map((i, idx) => `${idx + 1}. ${i.name} (${i.amount})`).join('\n') +
      `\n\n📌 바로 확인하기: ${window.location.origin}/menu/${menu.id}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedList(true);
      setTimeout(() => setCopiedList(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/menu/${menu.id}` : '';
    const title = `오늘 뭐먹지? - ${menu.name}`;
    const text = isTvFeatured && menu.tvFeature
      ? `📺 방송 화제! [${menu.tvFeature.showName}] ${menu.name} 레시피와 재료 보기`
      : `오늘 저녁은 '${menu.name}' 어때요? 15분 완성 밀키트와 레시피 확인하기!`;
    const res = await shareMenuItem(title, text, url);
    if (res === 'copied') {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full my-8 shadow-2xl relative border border-gray-100 overflow-hidden">
        {/* 상단 닫기, 찜, 공유 버튼 */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer ${
              isFav
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
            title={isFav ? '찜 취소' : '찜하기'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white hover:bg-black/60 transition-colors cursor-pointer"
            title="공유하기"
          >
            {copiedShare ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white hover:bg-black/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 상단 이미지 헤더 */}
        <div className="relative h-56 w-full bg-gray-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getAssetPath(menu.imageUrl)}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              {/* 방송 정보 뱃지 */}
              {isTvFeatured && menu.tvFeature ? (
                <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-xs font-black flex items-center gap-1">
                  <Tv className="w-3 h-3 text-yellow-300" />
                  <span>{menu.tvFeature.showName}</span>
                </span>
              ) : null}

              {/* 배송 형태 뱃지 */}
              {countryMode === 'KR' ? (
                isRocketDelivery ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-[11px] font-bold flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>로켓프레시 / 당일도착</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-600 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Package className="w-3 h-3 text-amber-300" />
                    <span>일반배송 (판매자직송)</span>
                  </span>
                )
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-[11px] font-bold">
                  Amazon / Instacart
                </span>
              )}

              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs backdrop-blur-xs flex items-center gap-1">
                <Clock className="w-3 h-3 text-yellow-300" />
                {menu.cookingTimeMinutes}분 완성
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {countryMode === 'KR' ? menu.name : menu.nameEn}
            </h2>
            <p className="text-xs text-gray-200 mt-1 line-clamp-1">
              {countryMode === 'KR' ? menu.description : menu.descriptionEn}
            </p>
          </div>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* 방송 및 미디어 리뷰 정보 카드 (방송 메뉴일 때만 노출) */}
          {isTvFeatured && menu.tvFeature && (
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 p-4 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                <div className="flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-purple-600" />
                  <span>{menu.tvFeature.showName}</span>
                  {menu.tvFeature.episodeTitle && (
                    <span className="text-purple-600 font-normal">({menu.tvFeature.episodeTitle})</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>방영일: {menu.tvFeature.broadcastDate}</span>
                </div>
              </div>

              {menu.tvFeature.mediaReviewSummary && (
                <p className="text-xs text-purple-800/90 leading-relaxed font-medium bg-white/70 p-2.5 rounded-xl border border-purple-100">
                  🔥 {menu.tvFeature.mediaReviewSummary}
                </p>
              )}

              <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-0.5">
                <span className="font-semibold">배송 안내:</span>
                {isRocketDelivery ? (
                  <span className="text-red-600 font-bold flex items-center gap-0.5">
                    <Truck className="w-3 h-3" /> 쿠팡 로켓배송 지원 상품
                  </span>
                ) : (
                  <span className="text-amber-700 font-bold flex items-center gap-0.5">
                    <Package className="w-3 h-3" /> 일반 택배배송 상품 (로켓배송 아님 / 산지 직송)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 알맞는 상품이 연결된 경우에만 상품 구매 배너 노출 */}
          {hasProduct ? (
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isRocketDelivery
                ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-100'
                : 'bg-gradient-to-r from-slate-50 to-amber-50 border-amber-200'
            }`}>
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  isRocketDelivery ? 'text-red-600' : 'text-amber-800'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {isTvFeatured ? '방송 화제 추천 상품' : (countryMode === 'KR' ? '초간편 완제품 밀키트' : 'Fast Meal Kit Option')}
                </span>
                <h4 className="text-sm font-bold text-gray-900 mt-0.5">
                  {isRocketDelivery
                    ? (countryMode === 'KR' ? '로켓배송으로 오늘 바로 받아 요리하기' : 'Fast ship ready-to-cook meal')
                    : '전국 산지직송 일반배송 상품 (로켓배송 제외)'}
                </h4>
              </div>
              <button
                type="button"
                onClick={handleOpenMealkit}
                disabled={loadingAction === 'mealkit'}
                className={`w-full sm:w-auto px-4 py-2.5 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-75 ${
                  isRocketDelivery
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-slate-900 hover:bg-black text-amber-200'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {loadingAction === 'mealkit'
                    ? '링크 연결 중...'
                    : countryMode === 'KR'
                    ? (isRocketDelivery ? '쿠팡 로켓구매 바로가기' : '쿠팡 일반배송 바로가기')
                    : 'Buy on Amazon'}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500 text-center">
              * 방송에 소개된 알맞는 단일 완제품이 없어, 아래 핵심 식재료 조합으로 요리하실 수 있습니다.
            </div>
          )}

          {/* 스마트 식재료 번들러 & 장바구니 담기 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                  <span>🥬 필요한 식재료 번들</span>
                  <span className="text-xs font-normal text-gray-500">
                    ({selectedIngredients.length}/{menu.ingredients.length}개 선택)
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSelectAllIngredients}
                  className="text-gray-500 hover:text-gray-800 font-semibold cursor-pointer"
                >
                  {selectedIngredients.length === menu.ingredients.length ? '전체해제' : '전체선택'}
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={handleCopyShoppingList}
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
                  title="장보기 리스트 텍스트 복사"
                >
                  {copiedList ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedList ? '복사완료!' : '목록 복사'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {menu.ingredients.map((ing, idx) => {
                const isChecked = selectedIngredients.includes(ing.name);
                const isIngRocket = ing.deliveryType !== 'standard';
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleIngredient(ing.name)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all border cursor-pointer ${
                      isChecked
                        ? 'bg-red-50/40 border-red-200'
                        : 'bg-gray-50 border-gray-100 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleIngredient(ing.name);
                        }}
                        className="text-red-600"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 fill-red-100 text-red-600" />
                        ) : (
                          <Square className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold ${isChecked ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                            {countryMode === 'KR' ? ing.name : ing.nameEn}
                          </span>
                          {!isIngRocket && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                              일반배송
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-500">권장량: {ing.amount}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCoupangIngredient(
                          ing.name,
                          countryMode === 'KR' ? ing.coupangKeyword : ing.amazonKeyword
                        );
                      }}
                      disabled={loadingAction === `ing-${ing.name}`}
                      className="px-2.5 py-1.5 bg-white border border-gray-200 hover:border-red-300 hover:text-red-600 text-gray-700 text-[11px] font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-60"
                    >
                      <span>
                        {loadingAction === `ing-${ing.name}`
                          ? '연결 중...'
                          : countryMode === 'KR'
                          ? (isIngRocket ? '쿠팡' : '쿠팡 (일반)')
                          : 'Amazon'}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* 선택된 재료 번들 구매 버튼 */}
            {selectedIngredients.length > 0 && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleOpenSelectedIngredients}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-red-400" />
                  <span>
                    {countryMode === 'KR'
                      ? `선택한 ${selectedIngredients.length}개 재료 쿠팡에서 묶음 검색`
                      : `Get ${selectedIngredients.length} items on Instacart`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* 초간단 3줄 레시피 가이드 */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <h3 className="text-sm font-extrabold text-gray-900 mb-2.5 flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-emerald-600" />
              <span>{countryMode === 'KR' ? '초간단 3줄 레시피 가이드' : 'Quick 3-Step Recipe'}</span>
            </h3>
            <ol className="space-y-2">
              {(countryMode === 'KR' ? menu.simpleRecipe : menu.simpleRecipeEn).map((step, idx) => (
                <li key={idx} className="flex items-start text-xs text-gray-700 leading-relaxed">
                  <span className="font-extrabold text-red-600 mr-2 flex-shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 모달 하단 푸터 및 법적 공정위 문구 */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <AlertCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>
              {countryMode === 'KR'
                ? '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'
                : 'As an Amazon Associate we earn from qualifying purchases.'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xs rounded-xl transition-colors cursor-pointer w-full sm:w-auto"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
