'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CountryMode } from '@/types/menu';
import { Settings, UtensilsCrossed, Rocket, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  countryMode?: CountryMode;
  onCountryChange?: (mode: CountryMode) => void;
  onOpenSettings: () => void;
  onOpenRoulette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  countryMode = 'KR',
  onOpenSettings,
  onOpenRoulette,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  useEffect(() => {
    // 1. URL 쿼리 파라미터 확인 (?admin=true 또는 ?admin=1)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const adminParam = urlParams.get('admin');

      if (adminParam === 'true' || adminParam === '1') {
        localStorage.setItem('isAdminMode', 'true');
        setIsAdmin(true);
      } else if (adminParam === 'false' || adminParam === '0') {
        localStorage.removeItem('isAdminMode');
        setIsAdmin(false);
      } else {
        const stored = localStorage.getItem('isAdminMode');
        if (stored === 'true') {
          setIsAdmin(true);
        }
      }

      // 2. 관리자 모드 토글 단축키 (Ctrl + Shift + A 또는 Cmd + Shift + A)
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
          e.preventDefault();
          setIsAdmin((prev) => {
            const next = !prev;
            if (next) {
              localStorage.setItem('isAdminMode', 'true');
              alert('관리자 모드가 활성화되었습니다. (우측 상단 톱니바퀴 노출)');
            } else {
              localStorage.removeItem('isAdminMode');
              alert('관리자 모드가 비활성화되었습니다.');
            }
            return next;
          });
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // 로고 5회 연속 클릭 시 관리자 모드 토글 (모바일 관리자 접속 지원)
  const handleLogoClick = () => {
    setLogoClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setIsAdmin((curr) => {
          const toggled = !curr;
          if (toggled) {
            localStorage.setItem('isAdminMode', 'true');
            alert('관리자 모드가 활성화되었습니다.');
          } else {
            localStorage.removeItem('isAdminMode');
            alert('관리자 모드가 비활성화되었습니다.');
          }
          return toggled;
        });
        return 0;
      }
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* 좌측 로고 & 브랜드 타이틀 */}
        <div className="flex items-center space-x-2 flex-shrink-0 group min-w-0">
          <button
            type="button"
            onClick={handleLogoClick}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-red-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform flex-shrink-0 cursor-pointer"
            title="오늘 뭐먹지, 내일 뭐먹지"
          >
            <UtensilsCrossed className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          
          <Link href="/" className="flex items-center gap-1.5 min-w-0">
            <span className="text-sm sm:text-base md:text-lg font-black text-gray-900 tracking-tight truncate">
              {/* 모바일 숏 타이틀 / 데스크탑 풀 타이틀 */}
              <span className="sm:hidden">오늘 뭐먹지?</span>
              <span className="hidden sm:inline">오늘 뭐먹지, 내일 뭐먹지</span>
            </span>

            {/* 로켓배송 뱃지 */}
            <span
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-bold border border-red-200 flex-shrink-0"
              title="로켓배송 / 당일·새벽 도착"
            >
              <Rocket className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500 fill-red-500" />
              <span className="hidden sm:inline">로켓배송</span>
            </span>
          </Link>
        </div>

        {/* 우측 상단 액션 바 */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          {/* 룰렛 실행 버튼 */}
          <button
            type="button"
            onClick={onOpenRoulette}
            className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs shadow-xs hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all cursor-pointer flex-shrink-0"
            title="메뉴 룰렛 돌리기"
          >
            <span className="text-xs sm:text-sm leading-none">🎲</span>
            <span className="font-bold text-[11px] sm:text-xs">
              <span className="sm:hidden">룰렛</span>
              <span className="hidden sm:inline">메뉴 룰렛</span>
            </span>
          </button>

          {/* 관리자 전용 설정 톱니바퀴 (관리자 모드 활성화 시에만 노출) */}
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenSettings}
              title="관리자 설정 (파트너스 트래킹 ID 및 클릭 통계)"
              className="relative p-1.5 sm:p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Settings className="w-4 h-4 animate-spin-slow" />
              <span className="text-[10px] font-bold hidden sm:inline">관리자</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
