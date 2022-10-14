import Redis from "../redis/client";

const redis = Redis.getClient();

export class CacheStorage implements ICache {
  public type?: string;

  static async reset(rootKey: string, subKey?: string) {
    if (subKey) {
      return await redis.hDel(rootKey, subKey);
    }
    return await redis.del(rootKey);
  }

  static async set(rootKey: string, data: any) {
    return await redis.set(rootKey, JSON.stringify(data));
  }

  static async add(rootKey: string, subKey: string, data: any) {
    return await redis.hSet(rootKey, subKey, JSON.stringify(data));
  }

  static async del(rootKey: string) {
    return await redis.del(rootKey);
  }
}

export interface ICache {
  type?: string;
}
