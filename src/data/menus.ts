import { MenuItem, CategoryOption, ThemeOption } from '@/types/menu';
import { TV_SHOW_MENUS } from './menus/tv_show';
import { KOREAN_MENUS } from './menus/korean';
import { WESTERN_MENUS } from './menus/western';
import { ASIAN_MENUS } from './menus/asian';
import { DIET_MENUS } from './menus/diet';
import { SNACK_MENUS } from './menus/snack';
import { EASY_COOK_MENUS } from './menus/easy_cook';

// 전체 메뉴 데이터 결합 (총 2,220종)
export const MENUS_DATA: MenuItem[] = [
  ...TV_SHOW_MENUS,
  ...KOREAN_MENUS,
  ...WESTERN_MENUS,
  ...ASIAN_MENUS,
  ...DIET_MENUS,
  ...SNACK_MENUS,
  ...EASY_COOK_MENUS,
];

// 1. 카테고리: 요리 종류 / 대분류 (Cuisine Classification)
export const CATEGORIES: CategoryOption[] = [
  { id: 'all', name: '전체', nameEn: 'All', icon: '🍽️' },
  { id: 'korean', name: '한식', nameEn: 'Korean', icon: '🍲' },
  { id: 'western', name: '양식·파스타', nameEn: 'Western', icon: '🍝' },
  { id: 'asian', name: '아시안·일식', nameEn: 'Asian & Japanese', icon: '🍜' },
  { id: 'diet', name: '샐러드·식단', nameEn: 'Diet & Salads', icon: '🥗' },
  { id: 'snack', name: '분식·야식', nameEn: 'Street & Snacks', icon: '🍺' },
  { id: 'easy_cook', name: '간편조리·밀키트', nameEn: 'Quick Cook', icon: '⏱️' },
  { id: 'tv_show', name: '방송·미디어 맛집', nameEn: 'TV & Viral', icon: '📺' },
];

// 2. 상황별 추천 테마: 카테고리와 겹치지 않는 상황/목적/라이프스타일 필터 (Context & Situation)
export const THEME_TAGS: ThemeOption[] = [
  { id: 'all', label: '전체 테마', labelEn: 'All Themes', icon: '✨' },
  { id: 'popular', label: '실시간 인기 BEST', labelEn: 'Best Sellers', icon: '🔥' },
  { id: 'quick_10m', label: '10분 컷 초간편', labelEn: 'Under 10 Min', icon: '⚡' },
  { id: 'easy_beginner', label: '초보·자취 혼밥', labelEn: 'Easy & Solo', icon: '🧑‍🍳' },
  { id: 'soup_warm', label: '뜨끈한 국물·탕', labelEn: 'Hearty Soups', icon: '🍲' },
  { id: 'party_special', label: '홈파티·주말특식', labelEn: 'Weekend Gourmet', icon: '🥩' },
  { id: 'low_cal', label: '가벼운 저칼로리', labelEn: 'Light & Healthy', icon: '🌿' },
  { id: 'late_night', label: '혼술·불금 안주', labelEn: 'Drinks & Snacks', icon: '🍻' },
  { id: 'tv_viral', label: '흑백요리사·방송화제', labelEn: 'TV & Chef Hits', icon: '📺' },
];

// 하위 호환성을 위한 alias
export const POPULAR_TAGS = THEME_TAGS.map((t) => ({
  label: `${t.icon} ${t.label}`,
  labelEn: `${t.icon} ${t.labelEn}`,
  value: t.id,
}));

/**
 * 상황별 추천 테마 필터링 함수
 * 카테고리와 독립적으로 작동하며, 어떤 카테고리와도 교차 필터링 가능
 */
export function matchMenuItemTheme(item: MenuItem, themeId: string): boolean {
  if (!themeId || themeId === 'all') return true;

  switch (themeId) {
    case 'popular':
      return (
        item.tags.some((t) => ['#로켓프레시인기', '#인기메뉴'].includes(t)) ||
        item.tagsEn.some((t) => ['#Popular', '#Recommended'].includes(t))
      );

    case 'quick_10m':
      return (
        item.cookingTimeMinutes <= 10 ||
        item.tags.some((t) => ['#5분요리', '#10분완성', '#초스피드'].includes(t)) ||
        item.category === 'easy_cook'
      );

    case 'easy_beginner':
      return (
        item.difficulty === '쉬움' ||
        item.difficulty === 'Easy' ||
        item.tags.some((t) => ['#초간단자취', '#혼밥메뉴'].includes(t))
      );

    case 'soup_warm':
      return (
        item.tags.some((t) =>
          ['#든든한국물', '#국물요리', '#얼큰감자탕', '#해장라면'].includes(t)
        ) ||
        /찌개|탕|국|전골|수프|나베|스튜|라멘|우동|짬뽕/.test(item.name) ||
        /soup|stew|hot pot|ramen|noodle soup/i.test(item.nameEn)
      );

    case 'party_special':
      return (
        item.tags.some((t) =>
          ['#홈스토랑', '#주말특식', '#바베큐스테이크', '#홈파티안주'].includes(t)
        ) || /스테이크|파스타|감바스|바베큐|리조또|우대갈비/.test(item.name)
      );

    case 'low_cal':
      return (
        (item.caloriesApprox !== undefined && item.caloriesApprox <= 420) ||
        item.category === 'diet' ||
        item.tags.some((t) =>
          ['#다이어트', '#식단관리', '#고단백저탄수', '#헬스식단', '#건강디저트'].includes(t)
        )
      );

    case 'late_night':
      return (
        item.category === 'snack' ||
        item.mealTime.includes('late_night') ||
        item.tags.some((t) =>
          ['#야식강추', '#불금안주', '#맥주안주', '#퓨전안주', '#박나래하이볼'].includes(t)
        )
      );

    case 'tv_viral':
      return (
        !!item.tvFeature ||
        item.category === 'tv_show' ||
        item.tags.some((t) =>
          [
            '#방송화제',
            '#최신레시피',
            '#넷플릭스흑백요리사',
            '#KBS2편스토랑',
            '#성시경먹을텐데',
            '#MBC전참시',
            '#나혼자산다',
          ].includes(t)
        )
      );

    default:
      // 기존 태그 직접 검색 호환
      return (
        item.tags.some((t) => t.includes(themeId)) ||
        item.tagsEn.some((t) => t.toLowerCase().includes(themeId.toLowerCase()))
      );
  }
}
