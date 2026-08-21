'use client';

import React from 'react';
import { CountryMode } from '@/types/menu';
import { ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  countryMode: CountryMode;
}

export const Footer: React.FC<FooterProps> = ({ countryMode }) => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800 text-xs mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* 공정거래위원회 파트너스 고지 배너 */}
        <div className="p-4 rounded-xl bg-gray-800/80 border border-gray-700 text-gray-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-gray-200">
              {countryMode === 'KR' ? '제휴 마케팅 공지사항' : 'Affiliate Disclosure'}
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {countryMode === 'KR' 
                ? '이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다. 추천 상품 및 식재료의 가격과 재고는 쿠팡의 사정에 따라 변동될 수 있습니다.'
                : 'As an Amazon Associate and affiliate partner, we earn from qualifying purchases at no additional cost to you. Product prices and availability are accurate as of the date/time indicated.'}
            </p>
          </div>
        </div>

        {/* 푸터 하단 정보 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-800 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white">왓잇 (Watteat)</span>
            <span>•</span>
            <span>오늘 뭐먹지? 내일 뭐먹지? 식사 메뉴 큐레이션</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-500">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for daily meal decisions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
