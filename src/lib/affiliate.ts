export interface AffiliateConfig {
  coupangTrackingId: string;
  coupangSubId?: string;
  coupangAccessKey?: string;
  coupangSecretKey?: string;
  amazonTag: string;
}

export interface ClickLogItem {
  id: string;
  timestamp: number;
  menuId: string;
  menuName: string;
  itemType: 'mealkit' | 'ingredient' | 'all';
  itemName: string;
  platform: 'coupang' | 'amazon' | 'instacart';
  url: string;
}

export interface MenuHistoryItem {
  rouletteCount: number;
  lastRouletteAt?: number;
  viewCount: number;
  lastViewedAt?: number;
}

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  coupangTrackingId: 'AF7547927', // 사용자 쿠팡 파트너스 ID
  coupangSubId: 'whattoeat_web',
  coupangAccessKey: '',
  coupangSecretKey: '',
  amazonTag: 'whattoeat-20',
};

const STORAGE_KEY = 'whattoeat_affiliate_config';
const CLICK_LOGS_STORAGE_KEY = 'whattoeat_click_logs';
const FAVORITES_STORAGE_KEY = 'whattoeat_favorites';
const MENU_HISTORY_KEY = 'whattoeat_menu_history';

export function getStoredAffiliateConfig(): AffiliateConfig {
  if (typeof window === 'undefined') return DEFAULT_AFFILIATE_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_AFFILIATE_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to read affiliate config from localStorage', e);
  }
  return DEFAULT_AFFILIATE_CONFIG;
}

export function saveAffiliateConfig(config: AffiliateConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save affiliate config', e);
  }
}

/**
 * 쿠팡 파트너스 검색 URL 생성 (트래킹 ID lptag 및 subid 결합)
 */
export function getCoupangSearchUrl(keyword: string, subId?: string): string {
  const config = getStoredAffiliateConfig();
  const trackingId = config.coupangTrackingId || 'AF7547927';
  const encoded = encodeURIComponent(keyword);
  const effectiveSubId = subId || config.coupangSubId || 'whattoeat_web';
  return `https://www.coupang.com/np/search?q=${encoded}&channel=user&lptag=${trackingId}&subid=${encodeURIComponent(effectiveSubId)}`;
}

/**
 * 쿠팡 파트너스 API를 통한 공식 단축 딥링크(link.coupang.com) 변환
 */
export async function getCoupangDeeplinkUrl(
  originalUrl: string,
  subId?: string
): Promise<string> {
  const config = getStoredAffiliateConfig();
  try {
    const response = await fetch('/api/coupang/deeplink', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        urls: [originalUrl],
        subId: subId || config.coupangSubId,
        accessKey: config.coupangAccessKey,
        secretKey: config.coupangSecretKey,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data[0] && data.data[0].shortenUrl) {
        return data.data[0].shortenUrl;
      }
    }
  } catch (err) {
    console.warn('Deeplink API request failed, falling back to direct search URL:', err);
  }
  return originalUrl;
}

/**
 * Amazon 어필리에이트 검색 링크 생성
 */
export function getAmazonSearchUrl(keyword: string, tag?: string): string {
  const effectiveTag = tag || getStoredAffiliateConfig().amazonTag || DEFAULT_AFFILIATE_CONFIG.amazonTag;
  const encoded = encodeURIComponent(keyword);
  return `https://www.amazon.com/s?k=${encoded}&tag=${effectiveTag}`;
}

/**
 * Instacart 장바구니 검색 링크 생성
 */
export function getInstacartSearchUrl(keyword: string): string {
  const encoded = encodeURIComponent(keyword);
  return `https://www.instacart.com/store/s?k=${encoded}`;
}

/**
 * 클릭 로그 저장 (로컬 통계 추적)
 */
export function trackAffiliateClick(
  menuId: string,
  menuName: string,
  itemType: 'mealkit' | 'ingredient' | 'all',
  itemName: string,
  platform: 'coupang' | 'amazon' | 'instacart',
  url: string
): void {
  if (typeof window === 'undefined') return;
  try {
    const newLog: ClickLogItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now(),
      menuId,
      menuName,
      itemType,
      itemName,
      platform,
      url,
    };

    const existingLogs: ClickLogItem[] = JSON.parse(
      localStorage.getItem(CLICK_LOGS_STORAGE_KEY) || '[]'
    );
    const updated = [newLog, ...existingLogs].slice(0, 500);
    localStorage.setItem(CLICK_LOGS_STORAGE_KEY, JSON.stringify(updated));

    // 조회/이용 이력도 기록
    recordMenuViewHistory(menuId);
  } catch (e) {
    console.error('Failed to log click event', e);
  }
}

/**
 * 클릭 통계 조회
 */
export function getAffiliateClickStats(): {
  totalClicks: number;
  coupangClicks: number;
  amazonClicks: number;
  instacartClicks: number;
  recentLogs: ClickLogItem[];
} {
  if (typeof window === 'undefined') {
    return { totalClicks: 0, coupangClicks: 0, amazonClicks: 0, instacartClicks: 0, recentLogs: [] };
  }
  try {
    const logs: ClickLogItem[] = JSON.parse(
      localStorage.getItem(CLICK_LOGS_STORAGE_KEY) || '[]'
    );
    const coupangClicks = logs.filter((l) => l.platform === 'coupang').length;
    const amazonClicks = logs.filter((l) => l.platform === 'amazon').length;
    const instacartClicks = logs.filter((l) => l.platform === 'instacart').length;

    return {
      totalClicks: logs.length,
      coupangClicks,
      amazonClicks,
      instacartClicks,
      recentLogs: logs.slice(0, 20),
    };
  } catch (e) {
    console.error('Failed to get click stats', e);
    return { totalClicks: 0, coupangClicks: 0, amazonClicks: 0, instacartClicks: 0, recentLogs: [] };
  }
}

/**
 * 클릭 통계 초기화
 */
export function clearAffiliateClickStats(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CLICK_LOGS_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear click stats', e);
  }
}

/**
 * 즐겨찾기(북마크) 목록 가져오기
 */
export function getFavoriteMenuIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const favs = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return favs ? JSON.parse(favs) : [];
  } catch (e) {
    console.error('Failed to get favorites', e);
    return [];
  }
}

/**
 * 즐겨찾기 토글 (추가/삭제)
 */
export function toggleFavoriteMenuId(menuId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getFavoriteMenuIds();
    let updated: string[];
    if (current.includes(menuId)) {
      updated = current.filter((id) => id !== menuId);
    } else {
      updated = [...current, menuId];
    }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to toggle favorite', e);
    return [];
  }
}

// =========================================================================
// 🎯 메뉴 이용 이력 & 가중치 룰렛 시스템 (Frequency-based Weighted Selection)
// =========================================================================

/**
 * 전체 메뉴 이용 이력 조회
 */
export function getAllMenuHistory(): Record<string, MenuHistoryItem> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(MENU_HISTORY_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to get menu history', e);
    return {};
  }
}

/**
 * 룰렛 당첨 이력 기록
 */
export function recordMenuRouletteWin(menuId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getAllMenuHistory();
    const current = history[menuId] || { rouletteCount: 0, viewCount: 0 };
    history[menuId] = {
      ...current,
      rouletteCount: current.rouletteCount + 1,
      lastRouletteAt: Date.now(),
    };
    localStorage.setItem(MENU_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to record roulette win', e);
  }
}

/**
 * 메뉴 상세 조회 / 이용 이력 기록
 */
export function recordMenuViewHistory(menuId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getAllMenuHistory();
    const current = history[menuId] || { rouletteCount: 0, viewCount: 0 };
    history[menuId] = {
      ...current,
      viewCount: current.viewCount + 1,
      lastViewedAt: Date.now(),
    };
    localStorage.setItem(MENU_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to record menu view history', e);
  }
}

/**
 * 특정 메뉴의 당첨 확률 가중치 계산
 * - 한 번도 당첨/조회 안 된 메뉴: 가중치 100 (가장 높은 당첨 확률)
 * - 1회 당첨된 메뉴: 가중치 20 (80% 확률 감소)
 * - 2회 이상 당첨된 메뉴: 가중치 5 (95% 확률 감소)
 * - 최근 24시간 내 당첨 시 가중치 50% 추가 감소
 */
export function calculateMenuWeight(menuId: string, history: Record<string, MenuHistoryItem>): number {
  const item = history[menuId];
  if (!item || (item.rouletteCount === 0 && item.viewCount === 0)) {
    return 100; // 미경험 메뉴 최고 가중치
  }

  let weight = 100;

  // 룰렛 당첨 횟수에 따른 감쇄
  if (item.rouletteCount === 1) {
    weight = 20;
  } else if (item.rouletteCount >= 2) {
    weight = 5;
  } else if (item.viewCount > 0) {
    weight = 40; // 룰렛 당첨은 아니지만 이미 확인/이용한 메뉴
  }

  // 최근 24시간 이내 당첨된 경우 가중치 추가 감쇄
  if (item.lastRouletteAt) {
    const hoursSinceLast = (Date.now() - item.lastRouletteAt) / (1000 * 60 * 60);
    if (hoursSinceLast < 24) {
      weight = Math.max(1, Math.floor(weight * 0.4));
    }
  }

  return weight;
}

/**
 * 가중치 기반 무작위 메뉴 추첨 (Weighted Random Selection)
 */
export function pickWeightedMenuItem<T extends { id: string }>(
  items: T[],
  history?: Record<string, MenuHistoryItem>
): { selected: T; weightMap: Record<string, number> } {
  if (!items || items.length === 0) {
    throw new Error('Items array cannot be empty');
  }

  const currentHistory = history || getAllMenuHistory();
  const weightMap: Record<string, number> = {};
  let totalWeight = 0;

  items.forEach((item) => {
    const w = calculateMenuWeight(item.id, currentHistory);
    weightMap[item.id] = w;
    totalWeight += w;
  });

  // 누적 가중치 랜덤 선택
  let randomVal = Math.random() * totalWeight;
  for (const item of items) {
    randomVal -= weightMap[item.id];
    if (randomVal <= 0) {
      return { selected: item, weightMap };
    }
  }

  return { selected: items[items.length - 1], weightMap };
}

/**
 * 스마트 SNS 공유 기능
 */
export async function shareMenuItem(
  title: string,
  text: string,
  url: string
): Promise<'shared' | 'copied' | 'error'> {
  if (typeof window === 'undefined') return 'error';
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return 'shared';
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
      return 'copied';
    }
  } catch (err: unknown) {
    const e = err as Error;
    if (e.name === 'AbortError') return 'shared';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
      return 'copied';
    }
  }
  return 'error';
}
