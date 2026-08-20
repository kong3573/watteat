import { MenuItem, CategoryOption } from '@/types/menu';
import { TV_SHOW_MENUS } from './menus/tv_show';
import { KOREAN_MENUS } from './menus/korean';
import { WESTERN_MENUS } from './menus/western';
import { ASIAN_MENUS } from './menus/asian';
import { DIET_MENUS } from './menus/diet';
import { SNACK_MENUS } from './menus/snack';
import { EASY_COOK_MENUS } from './menus/easy_cook';

// 전체 150개 이상 메뉴 데이터 결합 (총 153종)
export const MENUS_DATA: MenuItem[] = [
  ...TV_SHOW_MENUS,   // 25종
  ...KOREAN_MENUS,    // 25종
  ...WESTERN_MENUS,   // 21종
  ...ASIAN_MENUS,     // 21종
  ...DIET_MENUS,      // 21종
  ...SNACK_MENUS,     // 20종
  ...EASY_COOK_MENUS, // 20종
];

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', name: '전체 메뉴', nameEn: 'All Meals', icon: '🍽️' },
  { id: 'tv_show', name: '📺 방송 & 화제 맛집', nameEn: 'TV & Viral Shows', icon: '📺' },
  { id: 'korean', name: '든든한 한식', nameEn: 'Korean Comfort', icon: '🍲' },
  { id: 'western', name: '양식 & 파스타', nameEn: 'Western & Steak', icon: '🍝' },
  { id: 'asian', name: '아시안 & 일식', nameEn: 'Asian & Japanese', icon: '🍜' },
  { id: 'diet', name: '다이어트 & 헬스', nameEn: 'Diet & Healthy', icon: '🥗' },
  { id: 'snack', name: '야식 & 불금분식', nameEn: 'Late Night & Snack', icon: '🍺' },
  { id: 'easy_cook', name: '초스피드 간편식', nameEn: '5-Min Quick Cook', icon: '⏱️' },
];

export const POPULAR_TAGS = [
  { label: '전체', labelEn: 'All', value: 'all' },
  { label: '📺 최신 방송 화제', labelEn: '📺 As Seen on TV', value: '#흑백요리사' },
  { label: '🔥 인기 추천', labelEn: '🔥 Popular', value: '#로켓프레시인기' },
  { label: '⏱️ 10분 이내 초스피드', labelEn: '⏱️ Under 10 Min', value: '#5분요리' },
  { label: '🍲 든든한 국물', labelEn: '🍲 Hearty Soups', value: '#든든한국물' },
  { label: '🥗 고단백/다이어트', labelEn: '🥗 High Protein', value: '#고단백저탄수' },
  { label: '🍺 불금/야식/안주', labelEn: '🍺 Late Night/Snack', value: '#야식강추' },
];
