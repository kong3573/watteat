'use client';

import React from 'react';
import Link from 'next/link';
import { MenuItem, CountryMode } from '@/types/menu';
import { Clock, ShoppingBag, ArrowUpRight, ChefHat, ExternalLink, Heart, Sparkles, Award, Tv, Truck, Package } from 'lucide-react';
import {
  getCoupangSearchUrl,
  getAmazonSearchUrl,
  getInstacartSearchUrl,
  getCoupangDeeplinkUrl,
  trackAffiliateClick,
} from '@/lib/affiliate';
import { getAssetPath } from '@/lib/assets';

interface MenuCardProps {
  menu: MenuItem;
  countryMode: CountryMode;
  isFavorite?: boolean;
  rouletteCount?: number;
  viewCount?: number;
  onToggleFavorite?: (id: string) => void;
  onOpenDetail: (menu: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  menu,
  countryMode,
  isFavorite = false,
  rouletteCount = 0,
  viewCount = 0,
  onToggleFavorite,
  onOpenDetail,
}) => {
  const handleMealkitClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleIngredientsDirectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (countryMode === 'US') {
      const url = getInstacartSearchUrl(menu.instacartKeyword);
      trackAffiliateClick(menu.id, menu.nameEn, 'all', '식재료 장바구니', 'instacart', url);
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      onOpenDetail(menu);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(menu.id);
    }
  };

  const isUnexplored = rouletteCount === 0 && viewCount === 0;
  const isTvFeatured = !!menu.tvFeature;
  const isRocketDelivery = menu.tvFeature ? menu.tvFeature.deliveryType === 'rocket' : true;
  const hasProduct = menu.tvFeature ? menu.tvFeature.hasProductMatch : true;

  return (
    <div 
      onClick={() => onOpenDetail(menu)}
      className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* 썸네일 이미지 & 뱃지 */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getAssetPath(menu.imageUrl)}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* 상단 좌측 뱃지 (조리시간 / 방송 화제 / 이력) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <div className="flex flex-wrap gap-1 items-center">
            <span className="px-2.5 py-0.5 rounded-lg bg-white/95 backdrop-blur-xs text-[11px] font-bold text-gray-900 shadow-xs flex items-center gap-1">
              <Clock className="w-3 h-3 text-red-500" />
              {menu.cookingTimeMinutes}분 컷
            </span>

            {/* 방송 화제 뱃지 */}
            {isTvFeatured && menu.tvFeature && (
              <span className="px-2 py-0.5 rounded-lg bg-purple-600/95 backdrop-blur-xs text-[10px] font-black text-white shadow-xs flex items-center gap-1">
                <Tv className="w-3 h-3 text-yellow-300" />
                <span>{menu.tvFeature.showName}</span>
              </span>
            )}
          </div>

          {/* 방송 방영일 표시 */}
          {isTvFeatured && menu.tvFeature && (
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-semibold text-yellow-200">
              방영일: {menu.tvFeature.broadcastDate}
            </span>
          )}

          {/* 경험 이력 뱃지: 미경험 vs 당첨 이력 (일반 메뉴) */}
          {!isTvFeatured && (
            isUnexplored ? (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/90 backdrop-blur-xs text-[10px] font-extrabold text-white shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-200 fill-yellow-200" />
                <span>새로운 메뉴</span>
              </span>
            ) : rouletteCount > 0 ? (
              <span className="px-2 py-0.5 rounded-md bg-indigo-600/85 backdrop-blur-xs text-[10px] font-medium text-indigo-100 flex items-center gap-0.5">
                <Award className="w-3 h-3" />
                <span>룰렛 {rouletteCount}회</span>
              </span>
            ) : null
          )}
        </div>

        {/* 상단 우측 액션 (즐겨찾기 & 독립 페이지 링크) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`p-2 rounded-xl backdrop-blur-xs transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/40 hover:bg-black/70 text-white'
            }`}
            title={isFavorite ? '찜 취소' : '찜하기'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <Link
            href={`/menu/${menu.id}`}
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/70 backdrop-blur-xs text-white transition-colors"
            title="독립 페이지로 보기"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 하단 배송 형태 뱃지 (로켓배송 vs 일반배송 구분 표기) */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex flex-wrap gap-1">
            {(countryMode === 'KR' ? menu.tags : menu.tagsEn).slice(0, 2).map((t, idx) => (
              <span key={idx} className="text-[10px] bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md font-medium text-gray-200">
                {t}
              </span>
            ))}
          </div>

          {/* 로켓배송 여부 명확히 구분 */}
          {countryMode === 'KR' ? (
            isRocketDelivery ? (
              <span className="text-[10px] font-bold bg-red-600 px-2 py-0.5 rounded text-white flex items-center gap-1 shadow-xs">
                <Truck className="w-3 h-3" />
                <span>로켓배송</span>
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-slate-800 border border-slate-600 px-2 py-0.5 rounded text-amber-300 flex items-center gap-1 shadow-xs">
                <Package className="w-3 h-3 text-amber-300" />
                <span>일반배송</span>
              </span>
            )
          ) : (
            <span className="text-[10px] font-semibold bg-blue-600 px-2 py-0.5 rounded text-white">
              Fast Ship
            </span>
          )}
        </div>
      </div>

      {/* 본문 정보 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-base sm:text-lg text-gray-900 group-hover:text-red-600 transition-colors leading-snug">
              {countryMode === 'KR' ? menu.name : menu.nameEn}
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
            {countryMode === 'KR' ? menu.description : menu.descriptionEn}
          </p>
        </div>

        {/* 핵심 재료 요약 */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-gray-600">
          <span className="font-bold text-gray-800">재료: </span>
          {menu.ingredients.map((ing) => (countryMode === 'KR' ? ing.name : ing.nameEn)).join(', ')}
        </div>

        {/* 액션 버튼 (알맞는 상품이 연결된 경우에만 상품 구매 버튼 표시) */}
        <div className="mt-3.5 pt-2 grid grid-cols-2 gap-2">
          {hasProduct ? (
            <button
              type="button"
              onClick={handleMealkitClick}
              title={
                countryMode === 'KR'
                  ? isRocketDelivery
                    ? '쿠팡 로켓 밀키트/세트 바로보기'
                    : '쿠팡 일반배송 상품 바로보기'
                  : 'Buy on Amazon'
              }
              className={`w-full py-2.5 px-2 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer ${
                isRocketDelivery
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-red-500/20'
                  : 'bg-gradient-to-r from-slate-800 to-slate-900 hover:bg-black text-amber-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="truncate">
                {countryMode === 'KR' 
                  ? (isRocketDelivery ? '쿠팡 구매 (로켓)' : '쿠팡 구매 (일반)') 
                  : 'Buy on Amazon'}
              </span>
              <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
            </button>
          ) : (
            <div className="w-full py-2 px-2 bg-gray-100 rounded-xl text-[10px] text-gray-400 font-medium flex items-center justify-center text-center">
              상품 준비 중
            </div>
          )}

          {/* 옵션 2: 식재료 세트 & 레시피 */}
          <button
            type="button"
            onClick={handleIngredientsDirectClick}
            title={countryMode === 'KR' ? '식재료 묶음 및 레시피 확인' : 'Get fresh ingredients on Instacart'}
            className="w-full py-2.5 px-2 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all border border-gray-200 cursor-pointer"
          >
            <ChefHat className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate">{countryMode === 'KR' ? '식재료 & 레시피' : 'Ingredients'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
