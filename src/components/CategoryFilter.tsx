'use client';

import React from 'react';
import { CATEGORIES, THEME_TAGS } from '@/data/menus';
import { CountryMode } from '@/types/menu';
import { Search, X, Heart, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

interface CategoryFilterProps {
  countryMode: CountryMode;
  selectedCategory: string;
  selectedTag: string;
  searchQuery: string;
  favoritesCount?: number;
  unexploredCount?: number;
  onSelectCategory: (cat: string) => void;
  onSelectTag: (tag: string) => void;
  onSearchChange: (query: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  countryMode,
  selectedCategory,
  selectedTag,
  searchQuery,
  favoritesCount = 0,
  unexploredCount = 0,
  onSelectCategory,
  onSelectTag,
  onSearchChange,
}) => {
  return (
    <div className="space-y-4 my-6">
      {/* 1. 상단 검색바 */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            countryMode === 'KR'
              ? '먹고 싶은 메뉴나 식재료 검색 (예: 된장찌개, 파스타, 닭가슴살)'
              : 'Search recipes, meals, or ingredients (e.g. Pasta, Salmon, Tofu)'
          }
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. 1단: 요리 종류 / 대분류 카테고리 */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
          {/* 안 먹어본 메뉴 (스마트 추천 탭) */}
          {unexploredCount > 0 && (
            <button
              type="button"
              onClick={() => onSelectCategory(selectedCategory === 'unexplored' ? 'all' : 'unexplored')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                selectedCategory === 'unexplored'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 ring-2 ring-amber-400/40'
                  : 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
              <span>{countryMode === 'KR' ? `안 먹어본 메뉴 (${unexploredCount})` : `New Finds (${unexploredCount})`}</span>
            </button>
          )}

          {/* 찜한 메뉴 탭 */}
          {favoritesCount > 0 && (
            <button
              type="button"
              onClick={() => onSelectCategory(selectedCategory === 'favorites' ? 'all' : 'favorites')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                selectedCategory === 'favorites'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 ring-2 ring-rose-400/40'
                  : 'bg-rose-50 text-rose-600 border border-rose-200/80 hover:bg-rose-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${selectedCategory === 'favorites' ? 'fill-white' : 'fill-rose-500'}`} />
              <span>{countryMode === 'KR' ? `찜한 메뉴 (${favoritesCount})` : `Favorites (${favoritesCount})`}</span>
            </button>
          )}

          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-md shadow-gray-900/10'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{countryMode === 'KR' ? cat.name : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 2단: 상황 & 취향 필터 (카테고리와 독립된 상황별 교차 필터링) */}
      <div className="bg-white/70 backdrop-blur-xs rounded-2xl border border-gray-100 p-2 sm:p-2.5 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none no-scrollbar text-xs">
          <div className="flex items-center gap-1 text-gray-400 font-semibold px-1.5 whitespace-nowrap flex-shrink-0">
            <SlidersHorizontal className="w-3 h-3 text-red-500" />
            <span className="text-[11px] sm:text-xs text-gray-500 font-bold">
              {countryMode === 'KR' ? '상황별 테마' : 'Theme'}
            </span>
          </div>

          <div className="h-4 w-px bg-gray-200 mx-0.5 flex-shrink-0" />

          {THEME_TAGS.map((t) => {
            const isActive = selectedTag === t.id;
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => onSelectTag(isActive && t.id !== 'all' ? 'all' : t.id)}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                  isActive && t.id !== 'all'
                    ? 'bg-red-500 text-white shadow-xs font-bold ring-2 ring-red-400/30'
                    : isActive && t.id === 'all'
                    ? 'bg-gray-800 text-white font-bold'
                    : 'bg-gray-50 text-gray-600 border border-gray-200/60 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{t.icon}</span>
                <span>{countryMode === 'KR' ? t.label : t.labelEn}</span>
                {isActive && t.id !== 'all' && <Check className="w-3 h-3 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

