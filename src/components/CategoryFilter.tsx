'use client';

import React from 'react';
import { CATEGORIES, POPULAR_TAGS } from '@/data/menus';
import { CountryMode } from '@/types/menu';
import { Search, X, Heart, Sparkles } from 'lucide-react';

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
      {/* 상단 검색바 */}
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
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 카테고리 탭 목록 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
        {/* 새로운 메뉴 탭 (안 먹어본 메뉴) */}
        {unexploredCount > 0 && (
          <button
            type="button"
            onClick={() => onSelectCategory('unexplored')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
              selectedCategory === 'unexplored'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
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
            onClick={() => onSelectCategory('favorites')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
              selectedCategory === 'favorites'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
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

      {/* 인기 태그 칩 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-gray-400 font-semibold pl-1 whitespace-nowrap">추천 테마:</span>
        {POPULAR_TAGS.map((t) => {
          const isActive = selectedTag === t.value;
          return (
            <button
              type="button"
              key={t.value}
              onClick={() => onSelectTag(t.value)}
              className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-red-50 text-red-600 border border-red-200 font-bold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {countryMode === 'KR' ? t.label : t.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
