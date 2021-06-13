import NodeCache from "node-cache";

export const noticeKey = "notice";
export const allNoticesKey = "allNotices";
export const userKey = "user";
export const allUsersKey = "allUsers";

export class Cache {
  cache;
  Cached;
  constructor() {
    this.cache = new NodeCache({ useClones: false });
    this.Cached = false;
  }

  save(key: NodeCache.Key, value: any) {
    this.cache.set(key, value);
  }

  async read(key: NodeCache.Key) {
    const value = await this.cache.get(key);
    if (value) {
      this.Cached = true;
      return value;
    }
    this.Cached = false;
  }

  delete(key: NodeCache.Key) {
    this.cache.del(key);
  }

  isCached() {
    return this.Cached;
  }
}
