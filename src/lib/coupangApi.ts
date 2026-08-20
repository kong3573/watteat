import crypto from 'crypto';

export interface CoupangApiCredentials {
  accessKey: string;
  secretKey: string;
}

/**
 * 쿠팡 파트너스 API 호출용 HMAC-SHA256 서명 생성
 */
export function generateCoupangHmacSignature(
  method: string,
  urlPath: string,
  secretKey: string,
  accessKey: string
): { authorization: string; datetime: string } {
  // GMT/UTC 기준 날짜시간 포맷: YYMMDDTHHMMSSZ (예: 260820T011000Z)
  const now = new Date();
  const yy = String(now.getUTCFullYear()).slice(2);
  const MM = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  const hh = String(now.getUTCHours()).padStart(2, '0');
  const mm = String(now.getUTCMinutes()).padStart(2, '0');
  const ss = String(now.getUTCSeconds()).padStart(2, '0');
  const datetime = `${yy}${MM}${dd}T${hh}${mm}${ss}Z`;

  const message = `${datetime}${method}${urlPath}`;
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');

  const authorization = `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;

  return { authorization, datetime };
}

export interface CoupangDeeplinkResponseItem {
  originalUrl: string;
  shortenUrl: string;
  landingUrl: string;
}

export interface CoupangDeeplinkApiResponse {
  rCode: string;
  rMessage: string;
  data: CoupangDeeplinkResponseItem[];
}

/**
 * 쿠팡 파트너스 딥링크 생성 요청
 */
export async function createCoupangDeeplink(
  urls: string[],
  subId: string | undefined,
  credentials: CoupangApiCredentials
): Promise<CoupangDeeplinkResponseItem[]> {
  const urlPath = '/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink';
  const fullUrl = `https://api-gateway.coupang.com${urlPath}`;

  const { authorization } = generateCoupangHmacSignature(
    'POST',
    urlPath,
    credentials.secretKey,
    credentials.accessKey
  );

  const requestBody: { coupangUrls: string[]; subId?: string } = {
    coupangUrls: urls,
  };
  if (subId) {
    requestBody.subId = subId;
  }

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Coupang API Error (${response.status}): ${errText}`);
  }

  const result: CoupangDeeplinkApiResponse = await response.json();
  if (result.rCode !== '0' || !result.data) {
    throw new Error(`Coupang API Returned Error: ${result.rMessage || result.rCode}`);
  }

  return result.data;
}
