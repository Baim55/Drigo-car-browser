const cacheStore = new Map();

export function getCached(key) {
  return cacheStore.get(key);
}

export function setCached(key, value) {
  cacheStore.set(key, value);
}

export function invalidateCache(predicate) {
  for (const key of cacheStore.keys()) {
    if (predicate(key)) {
      cacheStore.delete(key);
    }
  }
}

export function clearCache() {
  cacheStore.clear();
}
