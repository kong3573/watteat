'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MenuItem, CountryMode } from '@/types/menu';
import {
  Clock,
  ShoppingCart,
  ExternalLink,
  ChefHat,
  Share2,
  Check,
  Sparkles,
  ArrowLeft,
  Flame,
  AlertCircle,
  TrendingUp,
  Heart,
  Copy,
  CheckSquare,
  Square,
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
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TimeBanner } from '@/components/TimeBanner';
import { SettingsModal } from '@/components/SettingsModal';
import { getAssetPath } from '@/lib/assets';

interface MenuDetailViewProps {
  menu: MenuItem;
  relatedMenus: MenuItem[];
}

export const MenuDetailView: React.FC<MenuDetailViewProps> = ({ menu, relatedMenus }) => {
  const router = useRouter();
  const [countryMode, setCountryMode] = useState<CountryMode>('KR');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedList, setCopiedList] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setSelectedIngredients(menu.ingredients.map((i) => i.name));
    const favs = getFavoriteMenuIds();
    setIsFav(favs.includes(menu.id));
    recordMenuViewHistory(menu.id);
  }, [menu]);

  const isTvFeatured = !!menu.tvFeature;
  const isRocketDelivery = menu.tvFeature ? menu.tvFeature.deliveryType === 'rocket' : true;
  const hasProduct = menu.tvFeature ? menu.tvFeature.hasProductMatch : true;

  const handleToggleFavorite = () => {
    const updated = toggleFavoriteMenuId(menu.id);
    setIsFav(updated.includes(menu.id));
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
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header
        countryMode={countryMode}
        onCountryChange={(mode) => setCountryMode(mode)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenRoulette={() => router.push('/')}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6">
        {/* 상단 네비게이션 & 홈으로 돌아가기 */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs transition-all hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>전체 메뉴 & 룰렛으로 돌아가기</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border shadow-2xs transition-all cursor-pointer ${
                isFav
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
              <span>{isFav ? '찜 완료' : '찜하기'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer"
            >
              {copiedShare ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">링크 복사됨!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-gray-500" />
                  <span>공유하기</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 시간대 배송 안내 배너 */}
        <TimeBanner
          countryMode={countryMode}
          onFilterEveningMeal={() => router.push('/')}
          onFilterTomorrowMeal={() => router.push('/')}
        />

        {/* 메인 상세 카드 */}
        <article className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          {/* 상단 비주얼 이미지 배너 */}
          <div className="relative h-72 sm:h-96 w-full bg-gray-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAssetPath(menu.imageUrl)}
              alt={menu.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* 방송 정보 뱃지 */}
                {isTvFeatured && menu.tvFeature ? (
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-xs font-black shadow-md flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{menu.tvFeature.showName}</span>
                  </span>
                ) : null}

                {/* 배송 형태 뱃지 */}
                {countryMode === 'KR' ? (
                  isRocketDelivery ? (
                    <span className="px-3 py-1 rounded-full bg-red-600 text-xs font-black shadow-md flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      <span>로켓프레시 / 당일·새벽배송</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-black text-amber-300 shadow-md flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-amber-300" />
                      <span>일반 택배배송 (판매자직송)</span>
                    </span>
                  )
                ) : (
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-xs font-black shadow-md">
                    Amazon Fresh / Instacart
                  </span>
                )}

                <span className="px-3 py-1 rounded-full bg-white/20 text-xs backdrop-blur-md flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-yellow-300" />
                  {menu.cookingTimeMinutes}분 완성
                </span>
                {menu.caloriesApprox && (
                  <span className="px-3 py-1 rounded-full bg-black/40 text-xs backdrop-blur-md flex items-center gap-1 text-gray-200">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    약 {menu.caloriesApprox} kcal
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                {countryMode === 'KR' ? menu.name : menu.nameEn}
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 line-clamp-2 max-w-2xl">
                {countryMode === 'KR' ? menu.description : menu.descriptionEn}
              </p>

              {/* 태그 목록 */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(countryMode === 'KR' ? menu.tags : menu.tagsEn).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 본문 콘텐츠 */}
          <div className="p-6 sm:p-8 space-y-7">
            {/* 방송 및 미디어 리뷰 상세 카드 */}
            {isTvFeatured && menu.tvFeature && (
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 p-5 rounded-3xl border border-purple-100 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm font-black text-purple-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <Tv className="w-4 h-4" />
                    </div>
                    <div>
                      <span>{menu.tvFeature.showName}</span>
                      {menu.tvFeature.episodeTitle && (
                        <span className="text-xs font-semibold text-purple-600 block sm:inline sm:ml-2">
                          - {menu.tvFeature.episodeTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold bg-white/80 px-3 py-1 rounded-xl border border-purple-100 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span>방송 방영일: {menu.tvFeature.broadcastDate}</span>
                  </div>
                </div>

                {menu.tvFeature.mediaReviewSummary && (
                  <p className="text-xs sm:text-sm text-purple-900 leading-relaxed font-medium bg-white/90 p-3.5 rounded-2xl border border-purple-100">
                    🔥 {menu.tvFeature.mediaReviewSummary}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-600 pt-1">
                  <span className="font-bold">배송 유형 안내:</span>
                  {isRocketDelivery ? (
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> 쿠팡 로켓배송 / 당일도착 지원
                    </span>
                  ) : (
                    <span className="text-amber-800 font-bold flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" /> 산지직송 일반 택배배송 (로켓배송 아님)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 완제품 구매 배너 (알맞는 상품이 매칭된 경우만 노출) */}
            {hasProduct ? (
              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isRocketDelivery
                  ? 'bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border-red-200'
                  : 'bg-gradient-to-r from-slate-900/5 via-amber-500/10 to-stone-500/10 border-amber-300'
              }`}>
                <div className="space-y-1 text-center sm:text-left">
                  <span className={`text-xs font-black uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1 ${
                    isRocketDelivery ? 'text-red-600' : 'text-amber-800'
                  }`}>
                    <Sparkles className="w-4 h-4" />
                    {isTvFeatured ? '방송 화제 추천 상품' : (countryMode === 'KR' ? '초간편 완제품 밀키트 추천' : 'Fast Meal Kit Option')}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                    {isRocketDelivery
                      ? (countryMode === 'KR' ? '로켓배송으로 오늘 바로 받아 간편하게 완성하기' : 'Ready-to-cook meal kit with 1-click')
                      : '전국 산지직송 일반배송 상품 바로구매'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {isRocketDelivery
                      ? '신선 포장 & 빠른 도착으로 방송 속 그 맛을 오늘 저녁 식탁에서 즐겨보세요.'
                      : '* 본 상품은 판매자 일반 택배로 발송되는 산지직송 상품입니다.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenMealkit}
                  disabled={loadingAction === 'mealkit'}
                  className={`w-full sm:w-auto px-6 py-3.5 active:scale-95 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer disabled:opacity-75 ${
                    isRocketDelivery
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                      : 'bg-slate-900 hover:bg-black text-amber-200 shadow-slate-900/20'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {loadingAction === 'mealkit'
                      ? '쿠팡 연결 중...'
                      : countryMode === 'KR'
                      ? (isRocketDelivery ? '쿠팡 로켓구매 바로가기' : '쿠팡 일반배송 바로가기')
                      : 'Buy on Amazon'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ) : null}

            {/* 스마트 식재료 번들러 & 장바구니 담기 */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <span>🥬 필요한 식재료 번들</span>
                    <span className="text-xs font-normal text-gray-500">
                      ({selectedIngredients.length}/{menu.ingredients.length}개 선택)
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    집에 이미 있는 재료는 체크 해제하고, 없는 재료만 골라 담아보세요.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={handleSelectAllIngredients}
                    className="text-gray-500 hover:text-gray-800 font-semibold cursor-pointer px-2 py-1 bg-gray-100 rounded-lg"
                  >
                    {selectedIngredients.length === menu.ingredients.length ? '전체해제' : '전체선택'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyShoppingList}
                    className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer px-2.5 py-1 bg-emerald-50 rounded-lg"
                    title="장보기 리스트 텍스트 복사"
                  >
                    {copiedList ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedList ? '목록 복사됨!' : '목록 복사'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {menu.ingredients.map((ing, idx) => {
                  const isChecked = selectedIngredients.includes(ing.name);
                  const isIngRocket = ing.deliveryType !== 'standard';
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleIngredient(ing.name)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl transition-all border cursor-pointer ${
                        isChecked
                          ? 'bg-red-50/40 border-red-200'
                          : 'bg-gray-50 border-gray-100 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleIngredient(ing.name);
                          }}
                          className="text-red-600"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 fill-red-100 text-red-600" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs sm:text-sm font-bold block ${isChecked ? 'text-gray-900' : 'text-gray-500 line-through'}`}>
                              {countryMode === 'KR' ? ing.name : ing.nameEn}
                            </span>
                            {!isIngRocket && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                                일반배송
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">권장량: {ing.amount}</span>
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
                        className="px-3 py-2 bg-white border border-gray-200 hover:border-red-400 hover:text-red-600 text-gray-800 text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1 cursor-pointer disabled:opacity-60 flex-shrink-0"
                      >
                        <span>
                          {loadingAction === `ing-${ing.name}`
                            ? '연결 중...'
                            : countryMode === 'KR'
                            ? (isIngRocket ? '쿠팡 담기' : '쿠팡 (일반)')
                            : 'Amazon'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* 선택된 재료 번들 구매 버튼 */}
              {selectedIngredients.length > 0 && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleOpenSelectedIngredients}
                    className="w-full py-3 bg-gray-900 hover:bg-black active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-red-400" />
                    <span>
                      {countryMode === 'KR'
                        ? `선택한 ${selectedIngredients.length}개 재료 쿠팡에서 묶음 검색`
                        : `Get ${selectedIngredients.length} items on Instacart`}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 3줄 초간단 레시피 가이드 */}
            <div className="bg-gradient-to-br from-emerald-50/60 to-teal-50/60 rounded-3xl p-6 border border-emerald-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ChefHat className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-gray-900">
                    {countryMode === 'KR' ? '초간단 3단계 요리 가이드' : 'Quick 3-Step Recipe Guide'}
                  </h2>
                  <p className="text-xs text-gray-500">방송 속 레시피를 집에서 15분 만에 그대로 재현해보세요!</p>
                </div>
              </div>

              <ol className="space-y-3">
                {(countryMode === 'KR' ? menu.simpleRecipe : menu.simpleRecipeEn).map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-emerald-100 text-xs sm:text-sm text-gray-800 leading-relaxed font-medium shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 법적 공정위 문구 고지 */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <span>
                {countryMode === 'KR'
                  ? '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다. 상품 가격 및 배송 예정 시각은 쿠팡 실시간 재고에 따라 달라질 수 있습니다.'
                  : 'As an Amazon Associate, we earn from qualifying purchases.'}
              </span>
            </div>
          </div>
        </article>

        {/* 함께 보면 좋은 추천 메뉴 */}
        {relatedMenus.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-black text-gray-900">비슷한 카테고리 추천 메뉴</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedMenus.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/menu/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-32 w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.imageUrl}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white font-bold">
                      ⏱️ {rel.cookingTimeMinutes}분
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                      {rel.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer countryMode={countryMode} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
