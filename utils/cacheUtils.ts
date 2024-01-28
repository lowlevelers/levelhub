import moment from 'moment';

interface CachePayload<T> {
  cachedDate: number;
  expiredAfter: number;
  data: T;
}

export function storeJsonData<T>(key: string, data: CachePayload<T>) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getJsonData<T>(key: string): CachePayload<T> | null {
  const rawOutput = localStorage.getItem(key);
  try {
    if (!rawOutput) return null;
    const output = JSON.parse(rawOutput);
    return output as CachePayload<T>;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export function buildCachePayload<T>(data: T, ms: number): CachePayload<T> {
  return {
    data,
    expiredAfter: ms,
    cachedDate: moment().unix(),
  };
}

export async function getRevalidatedJsonData<T>(
  key: string,
  revalidateMethod?: () => Promise<CachePayload<T>>
): Promise<T | null> {
  const now = moment().unix();
  let cachedData = getJsonData<T>(key);
  if (!cachedData) return null;
  const isExpired = now >= cachedData.cachedDate + cachedData.expiredAfter;
  if (isExpired && revalidateMethod) {
    const newData = await revalidateMethod();
    cachedData = newData;
    storeJsonData<T>(key, newData);
  }
  return cachedData.data;
}
