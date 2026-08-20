'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CountryMode, MenuItem } from '@/types/menu';
import { MENUS_DATA } from '@/data/menus';
import { Header } from '@/components/Header';
import { TimeBanner } from '@/components/TimeBanner';
import { CategoryFilter } from '@/components/CategoryFilter';
import { MenuCard } from '@/components/MenuCard';
import { MenuRoulette } from '@/components/MenuRoulette';
import { MenuDetailModal } from '@/components/MenuDetailModal';
import { SettingsModal } from '@/components/SettingsModal';
import { Footer } from '@/components/Footer';
import {
  getFavoriteMenuIds,
  toggleFavoriteMenuId,
  getAllMenuHistory,
  MenuHistoryItem,
} from '@/lib/affiliate';
import { Sparkles, Utensils, HelpCircle, Compass } from 'lucide-react';

export default function Home() {
  const [countryMode, setCountryMode] = useState<CountryMode>('KR');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [menuHistory, setMenuHistory] = useState<Record<string, MenuHistoryItem>>({});

  // 모달 상태
  const [isRouletteOpen, setIsRouletteOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [selectedMenuDetail, setSelectedMenuDetail] = useState<MenuItem | null>(null);

  const refreshHistory = () => {
    setFavoriteIds(getFavoriteMenuIds());
    setMenuHistory(getAllMenuHistory());
  };

  useEffect(() => {
    refreshHistory();

    // URL 쿼리에 roulette 파라미터가 있을 때 자동 오픈
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('openRoulette') === 'true') {
        setIsRouletteOpen(true);
      }
    }
  }, []);

  const handleToggleFavorite = (menuId: string) => {
    const updated = toggleFavoriteMenuId(menuId);
    setFavoriteIds(updated);
  };

  // 안 먹어본(미경험) 메뉴 개수 계산
  const unexploredCount = useMemo(() => {
    return MENUS_DATA.filter((item) => {
      const hist = menuHistory[item.id];
      return !hist || (hist.rouletteCount === 0 && hist.viewCount === 0);
    }).length;
  }, [menuHistory]);

  // 필터링 및 스마트 우선 정렬된 메뉴 리스트
  const filteredMenus = useMemo(() => {
    const list = MENUS_DATA.filter((item) => {
      // 1. 안 먹어본 메뉴 필터
      if (selectedCategory === 'unexplored') {
        const hist = menuHistory[item.id];
        if (hist && (hist.rouletteCount > 0 || hist.viewCount > 0)) return false;
      } else if (selectedCategory === 'favorites') {
        // 2. 찜한 메뉴 필터
        if (!favoriteIds.includes(item.id)) return false;
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        // 3. 일반 카테고리 필터
        return false;
      }

      // 태그 필터
      if (selectedTag !== 'all') {
        const matchesTag = item.tags.some((t) => t.includes(selectedTag)) ||
          item.tagsEn.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
        if (!matchesTag) return false;
      }

      // 검색어 필터
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q) || item.descriptionEn.toLowerCase().includes(q);
        const matchesIng = item.ingredients.some((ing) => 
          ing.name.toLowerCase().includes(q) || ing.nameEn.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }

      return true;
    });

    // 🎯 재접속 사용자 스마트 유도: 안 먹어본 새로운 메뉴를 앞쪽에 배치하여 탐색 유도
    return list.sort((a, b) => {
      const aHist = menuHistory[a.id];
      const bHist = menuHistory[b.id];
      const aScore = (aHist?.rouletteCount || 0) * 2 + (aHist?.viewCount || 0);
      const bScore = (bHist?.rouletteCount || 0) * 2 + (bHist?.viewCount || 0);
      return aScore - bScore; // 이용 횟수가 적은(새로운) 메뉴 우선
    });
  }, [selectedCategory, selectedTag, searchQuery, favoriteIds, menuHistory]);

  // 무한 스크롤 및 성능 최적화: 초기 24개부터 점진적 렌더링
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // 필터나 검색어가 바뀌면 visibleCount를 초기화
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, selectedTag, searchQuery]);

  // 스크롤 감지용 인터섹션 옵저버 타겟
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 24, filteredMenus.length));
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredMenus.length]);

  const visibleMenus = useMemo(() => {
    return filteredMenus.slice(0, visibleCount);
  }, [filteredMenus, visibleCount]);

  // 빠른 필터 핸들러
  const handleFilterEvening = () => {
    setSelectedCategory('all');
    setSelectedTag('#5분요리');
    setSearchQuery('');
  };

  const handleFilterTomorrow = () => {
    setSelectedCategory('all');
    setSelectedTag('#든든한국물');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col selection:bg-red-500 selection:text-white">
      {/* 헤더 */}
      <Header
        countryMode={countryMode}
        onCountryChange={setCountryMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRoulette={() => setIsRouletteOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {/* 실시간 배송 타임라인 배너 */}
        <TimeBanner
          countryMode={countryMode}
          onFilterEveningMeal={handleFilterEvening}
          onFilterTomorrowMeal={handleFilterTomorrow}
        />

        {/* 메인 룰렛 유도 카드 */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-orange-500/15 mb-6 sm:mb-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold text-yellow-100">
                <Compass className="w-3.5 h-3.5" />
                <span>새로운 메뉴 우선 추천 룰렛</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                {countryMode === 'KR' 
                  ? '오늘 저녁 뭐 먹을지 아직도 고민이신가요?' 
                  : 'Stuck deciding what to cook for dinner?'}
              </h2>
              <p className="text-xs sm:text-sm text-yellow-100 max-w-xl">
                {countryMode === 'KR'
                  ? '이전에 안 먹어본 새로운 식단을 자동으로 분석해 3초 만에 오늘의 운명 메뉴를 추천합니다!'
                  : 'Smart roulette prioritizes recipes you haven\'t tried yet to keep meals exciting!'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsRouletteOpen(true)}
              className="w-full md:w-auto px-6 py-3.5 bg-white text-orange-600 hover:bg-yellow-50 active:scale-95 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer touch-manipulation z-20"
            >
              <Sparkles className="w-5 h-5 animate-bounce text-amber-500" />
              <span>{countryMode === 'KR' ? '새로운 메뉴 돌리기 🎲' : 'Spin The Wheel 🎲'}</span>
            </button>
          </div>

          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* 카테고리 & 검색 필터 */}
        <CategoryFilter
          countryMode={countryMode}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          searchQuery={searchQuery}
          favoritesCount={favoriteIds.length}
          unexploredCount={unexploredCount}
          onSelectCategory={setSelectedCategory}
          onSelectTag={setSelectedTag}
          onSearchChange={setSearchQuery}
        />

        {/* 결과 카운트 및 상태 */}
        <div className="flex items-center justify-between my-4 text-xs font-semibold text-gray-500 px-1">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-red-500" />
            <span>총 {filteredMenus.length}개의 메뉴 제안</span>
            {selectedCategory === 'all' && unexploredCount > 0 && (
              <span className="text-[11px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                (새로운 메뉴 우선 정렬됨)
              </span>
            )}
          </div>
          {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="text-red-600 hover:underline font-bold cursor-pointer touch-manipulation"
            >
              필터 초기화
            </button>
          )}
        </div>

        {/* 메뉴 카드 그리드 (점진적 최적화 렌더링) */}
        {visibleMenus.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleMenus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  countryMode={countryMode}
                  isFavorite={favoriteIds.includes(menu.id)}
                  rouletteCount={menuHistory[menu.id]?.rouletteCount || 0}
                  viewCount={menuHistory[menu.id]?.viewCount || 0}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenDetail={(m) => setSelectedMenuDetail(m)}
                />
              ))}
            </div>

            {/* 무한 스크롤 옵저버 트리거 & 더보기 버튼 */}
            {visibleCount < filteredMenus.length && (
              <div ref={loadMoreRef} className="py-8 text-center flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredMenus.length))}
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-2xl border border-gray-200 shadow-xs active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                  더 많은 메뉴 불러오기 (+24개)
                </button>
                <p className="text-[11px] text-gray-400 font-medium">
                  {visibleCount} / {filteredMenus.length}개 표시 중
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200/80 my-6 shadow-2xs">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">
              {selectedCategory === 'unexplored'
                ? '축하합니다! 모든 메뉴를 이미 한 번씩 경험하셨습니다 🎉'
                : selectedCategory === 'favorites'
                ? '아직 찜한 메뉴가 없습니다'
                : '조건에 맞는 메뉴가 없습니다'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {selectedCategory === 'unexplored'
                ? '전체 메뉴 목록에서 다시 룰렛을 돌려보세요.'
                : selectedCategory === 'favorites'
                ? '마음에 드는 메뉴 카드의 하트(❤️) 버튼을 눌러 나만의 메뉴판을 만들어보세요!'
                : '다른 검색어나 카테고리를 선택해보세요.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl cursor-pointer touch-manipulation"
            >
              전체 메뉴 보기
            </button>
          </div>
        )}
      </main>

      {/* 모달들 */}
      <MenuRoulette
        isOpen={isRouletteOpen}
        onClose={() => {
          setIsRouletteOpen(false);
          refreshHistory();
        }}
        menus={MENUS_DATA}
        countryMode={countryMode}
        onSelectMenu={(menu) => setSelectedMenuDetail(menu)}
      />

      <MenuDetailModal
        menu={selectedMenuDetail}
        countryMode={countryMode}
        onClose={() => {
          setSelectedMenuDetail(null);
          refreshHistory();
        }}
        onFavoritesChange={refreshHistory}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* 공정위 고지 & 푸터 */}
      <Footer countryMode={countryMode} />
    </div>
  );
}
