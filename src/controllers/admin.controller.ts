import { RequestHandler } from "express";
import { MyDatabase } from "../config";
import { Errors, Messages, REDIS_TABLES } from "../enums";

import Redis from "../redis/client";

export const dropDatabase: RequestHandler = async (req, res, next) => {
  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }
    const db = MyDatabase.getDb();
    await db.dropDatabase();

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.DATABASE_DROPPED },
    });
  } catch (error) {
    next(error);
  }
};

export const dropColl: RequestHandler = async (req, res, next) => {
  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }
    const db = MyDatabase.getDb();
    const resp = await db.dropCollection(req.body.name);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.COLLECTION_DROPPED, ok: resp },
    });
  } catch (error) {
    next(error);
  }
};

export const createIndex: RequestHandler = async (req, res, next) => {
  const { collection, ...rest } = req.body;

  const dbname = process.env.DB_NAME;
  const env = process.env.NODE_ENV;
  const canBeRemoved = dbname === "mooveTest" && env === "test";

  try {
    if (!canBeRemoved) {
      throw { httpCode: 403, name: Errors.ONLY_FOR_TEST };
    }
    const db = MyDatabase.getDb();
    await db.collection(collection).createIndex(rest);

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.INDEX_CREATED },
    });
  } catch (error) {
    next(error);
  }
};

export const getRedisKeys: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    const rootKeys = await redis.keys("*");

    res.status(200).json({
      body: { rootKeys },
      meta: { httpCode: 200, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const getRedisStat: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    const data = await redis.memoryStats();

    res.status(200).json({
      body: { data },
      meta: { httpCode: 200, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const getRedisKeyPairs: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    const keys = await redis.keys("*");
    const pairs: any = {};

    for (const key of keys) {
      const subkeys = await redis.hKeys(key);
      pairs[key] = subkeys;
    }

    res.status(200).json({
      body: { keys: pairs },
      meta: { httpCode: 200, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const getRedisSubKeys: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    const keys = await redis.hKeys(req.params.rootKey);

    res.status(200).json({
      body: { keys },
      meta: { httpCode: 200, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const getRedisValues: RequestHandler = async (req, res, next) => {
  try {
    const rootKey = req.params.rootKey;

    const redis = Redis.getClient();

    const keys = await redis.hKeys(rootKey);

    const values: any[] = [];

    for (const key of keys) {
      const value = await redis.hGet(rootKey, key);
      if (value) {
        values.push({ key, data: JSON.parse(value) });
      }
    }

    res.status(200).json({
      body: { values },
      meta: { httpCode: 200, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const getRedisValue: RequestHandler = async (req, res, next) => {
  try {
    const rootKey = req.params.rootKey;
    const key = req.body.key;

    const redis = Redis.getClient();

    let value = await redis.hGet(rootKey, key as string);
    if (value) {
      value = JSON.parse(value);
    }

    res.status(200).json({
      body: { value: value || key },
      meta: { httpCode: 200, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const flushRedis: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    await redis.flushAll();

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.REDIS_RESETED, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const flushRedisTables: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    const keys = await redis.keys("*");

    for (const key of keys) {
      if (REDIS_TABLES.includes(key)) {
        await redis.del(key);
      }
    }

    res.status(200).json({
      meta: { httpCode: 200, message: Messages.REDIS_TABLES_RESETED, ok: true },
    });
  } catch (error) {
    next(error);
  }
};

export const delSingleRootKey: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    await redis.del(req.params.rootKey);

    res.status(200).json({
      meta: {
        httpCode: 200,
        message: Messages.REDIS_ROOT_KEY_DELETED,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const delSingleKey: RequestHandler = async (req, res, next) => {
  try {
    const redis = Redis.getClient();

    await redis.hDel(req.params.rootKey, req.body.key);

    res.status(200).json({
      meta: {
        httpCode: 200,
        message: Messages.REDIS_SUB_KEY_DELETED,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};
