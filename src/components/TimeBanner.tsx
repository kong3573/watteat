'use client';

import React, { useState, useEffect } from 'react';
import { CountryMode } from '@/types/menu';
import { Clock, Truck, Zap, Moon, Sun, ArrowRight } from 'lucide-react';

interface TimeBannerProps {
  countryMode: CountryMode;
  onFilterEveningMeal: () => void;
  onFilterTomorrowMeal: () => void;
}

export const TimeBanner: React.FC<TimeBannerProps> = ({
  countryMode,
  onFilterEveningMeal,
  onFilterTomorrowMeal,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [timeStr, setTimeStr] = useState<string>('');
  const [currentHour, setCurrentHour] = useState<number>(0);
  const [secondsUntilCutoff, setSecondsUntilCutoff] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      setCurrentHour(h);

      const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      setTimeStr(formatted);

      // 로켓프레시 배송 마감 계산
      // 00:00 ~ 10:00: 오전 10시 마감 -> 오늘 저녁 7시 도착
      // 10:00 ~ 24:00: 밤 12시 마감 -> 내일 아침 7시 도착
      if (h < 10) {
        const target = new Date(now);
        target.setHours(10, 0, 0, 0);
        const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
        setSecondsUntilCutoff(Math.max(0, diff));
      } else {
        const target = new Date(now);
        target.setHours(24, 0, 0, 0);
        const diff = Math.floor((target.getTime() - now.getTime()) / 1000);
        setSecondsUntilCutoff(Math.max(0, diff));
      }
    };

    updateTime();
    setMounted(true);

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSec: number) => {
    if (totalSec <= 0) return '마감 임박';
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  // 마운트 전에는 클라이언트 시간 기준 또는 기본 오전 슬롯(00시~10시)으로 표시
  const isMorningSlot = mounted ? currentHour < 10 : true;

  if (countryMode === 'US') {
    return (
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-4 px-4 sm:px-6 rounded-2xl shadow-lg my-4 sm:my-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 sm:p-3 bg-blue-500/20 rounded-xl border border-blue-400/30 text-blue-300">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-500 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Fast Grocery Delivery
                </span>
                <span className="text-[11px] sm:text-xs text-blue-200">Amazon Fresh 2-Hour Delivery</span>
              </div>
              <h2 className="text-sm sm:text-base md:text-lg font-bold mt-1 text-white">
                Pick your recipe, we deliver the fresh ingredients today!
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onFilterEveningMeal}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Tonight's Quick Dinner</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-md my-4 sm:my-6 transition-all" suppressHydrationWarning>
      {isMorningSlot ? (
        /* 오전/새벽 배너: 오늘 저녁 도착 */
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-4 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-3.5">
              <div className="p-2.5 sm:p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-yellow-100 shadow-inner flex-shrink-0">
                <Sun className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="bg-red-950/40 text-yellow-200 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border border-yellow-300/30 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                    오늘 저녁 7시 도착 타임
                  </span>
                  {mounted && timeStr && (
                    <span className="text-[11px] sm:text-xs text-white/90 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      현재 {timeStr}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-xl md:text-2xl font-extrabold mt-1 text-white tracking-tight">
                  오전 10시 전 주문 시, <span className="underline decoration-yellow-300 underline-offset-4">오늘 저녁 문 앞 도착!</span>
                </h2>
                <p className="text-xs sm:text-sm text-yellow-100 mt-0.5">
                  퇴근 후 바로 조리할 수 있는 15분 컷 밀키트와 신선 식재료를 골라보세요.
                </p>
              </div>
            </div>

            {/* 마감 카운트다운 및 필터 버튼 */}
            <div className="w-full md:w-auto flex flex-row items-center justify-between sm:justify-end gap-2 bg-black/20 p-2 sm:p-2.5 rounded-2xl border border-white/20 backdrop-blur-md">
              <div className="text-left sm:text-right px-2">
                <p className="text-[10px] sm:text-[11px] text-yellow-200 font-medium">당일 저녁배송 마감까지</p>
                <p className="text-xs sm:text-base font-extrabold text-white tracking-wider font-mono">
                  {mounted ? formatCountdown(secondsUntilCutoff) : '마감 계산 중...'}
                </p>
              </div>
              <button
                type="button"
                onClick={onFilterEveningMeal}
                className="px-3.5 sm:px-4 py-2 bg-white text-red-600 hover:bg-yellow-50 active:scale-95 text-xs sm:text-sm font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer flex-shrink-0"
              >
                <span>오늘 저녁 메뉴</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 오후/야간 배너: 내일 아침 문 앞 도착 (새벽배송) */
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-4 sm:p-6 border border-indigo-800/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-3.5">
              <div className="p-2.5 sm:p-3 bg-indigo-500/20 backdrop-blur-md rounded-2xl border border-indigo-400/30 text-indigo-200 shadow-inner flex-shrink-0">
                <Moon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="bg-indigo-900 text-indigo-200 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/40 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-cyan-300" />
                    내일 아침 7시 새벽도착 타임
                  </span>
                  {mounted && timeStr && (
                    <span className="text-[11px] sm:text-xs text-indigo-200 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      현재 {timeStr}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-xl md:text-2xl font-extrabold mt-1 text-white tracking-tight">
                  밤 12시 전 주문 시, <span className="text-cyan-300 font-bold">내일 아침 7시 문 앞 도착!</span>
                </h2>
                <p className="text-xs sm:text-sm text-indigo-200 mt-0.5">
                  내일 끼니 메뉴를 지금 정해두면 내일 하루가 편해집니다.
                </p>
              </div>
            </div>

            {/* 마감 카운트다운 및 필터 버튼 */}
            <div className="w-full md:w-auto flex flex-row items-center justify-between sm:justify-end gap-2 bg-black/40 p-2 sm:p-2.5 rounded-2xl border border-indigo-500/30 backdrop-blur-md">
              <div className="text-left sm:text-right px-2">
                <p className="text-[10px] sm:text-[11px] text-cyan-300 font-medium">새벽배송 주문 마감까지</p>
                <p className="text-xs sm:text-base font-extrabold text-white tracking-wider font-mono">
                  {mounted ? formatCountdown(secondsUntilCutoff) : '마감 계산 중...'}
                </p>
              </div>
              <button
                type="button"
                onClick={onFilterTomorrowMeal}
                className="px-3.5 sm:px-4 py-2 bg-cyan-400 hover:bg-cyan-300 active:scale-95 text-slate-950 text-xs sm:text-sm font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer flex-shrink-0"
              >
                <span>내일 추천 메뉴</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
