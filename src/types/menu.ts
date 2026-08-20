export type CountryMode = 'KR' | 'US';

export type MealTime = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'late_night' | 'snack';

export type Category = 
  | 'tv_show'
  | 'korean' 
  | 'western' 
  | 'asian' 
  | 'diet' 
  | 'snack' 
  | 'easy_cook';

export type DeliveryType = 'rocket' | 'standard'; // rocket: 로켓배송/로켓프레시, standard: 일반배송/판매자배송

export interface CategoryOption {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
}

export interface Ingredient {
  name: string;
  nameEn: string;
  amount: string;
  coupangKeyword: string;
  amazonKeyword: string;
  deliveryType?: DeliveryType; // 기본값은 rocket, 방송 특산품 등은 standard
}

export interface TvFeatureInfo {
  showName: string;           // 프로그램 이름 (예: "흑백요리사", "편스토랑", "성시경의 먹을텐데")
  broadcastDate: string;       // 방영 날짜 (예: "2024.10.08", "2024.04.12")
  episodeTitle?: string;       // 에피소드/코너명 (예: "나폴리 맛피아 밤 티라미수", "어남선생 류수영 만원레시피")
  mediaReviewSummary?: string; // 블로그/기사 화제 리뷰 요약
  deliveryType: DeliveryType;  // 메인 상품 배송 형태 (rocket: 로켓배송, standard: 일반배송)
  hasProductMatch: boolean;    // 알맞는 상품이 연결되어 있는지 여부 (false면 구매버튼 미표시)
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  mealTime: MealTime[];
  tags: string[];
  tagsEn: string[];
  cookingTimeMinutes: number;
  difficulty: '쉬움' | '보통' | '도전' | 'Easy' | 'Medium' | 'Hard';
  description: string;
  descriptionEn: string;
  imageUrl: string;
  caloriesApprox?: number;
  
  // 방송/미디어 리뷰 정보 (선택)
  tvFeature?: TvFeatureInfo;

  // 한국 타겟 (쿠팡)
  coupangMealkitKeyword: string;
  coupangDirectUrl?: string;
  ingredients: Ingredient[];
  simpleRecipe: string[];
  simpleRecipeEn: string[];

  // 미국 타겟 (Amazon / Instacart)
  usOptionName: string;
  amazonMealkitKeyword: string;
  instacartKeyword: string;
}

export interface FilterState {
  category: string;
  selectedTag: string;
  maxCookingTime: number | null;
  searchQuery: string;
}
