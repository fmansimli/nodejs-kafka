import { RequestHandler } from "express";
import { CacheStorage } from "../services";
import { ObjectId } from "../models";
import { RedisKeys } from "../enums";

export const getAll: RequestHandler = async (req, res, next) => {
  const { limit = 5, page = 1, fields, ...query } = req.query;
  const { rootKey, subKey } = req.params;

  try {
    const resp = {
      body: { tasks: [] },
      pagination: {},
      meta: {
        url: req.originalUrl,
        ok: true,
        from: "db",
      },
    };

    if (rootKey && subKey) CacheStorage.add(rootKey, subKey, resp);

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  const { id, rootKey, subKey } = req.params;

  try {
    const _id = new ObjectId(id);

    const resp = {
      body: { task: {} },
      meta: {
        url: req.originalUrl,
        ok: true,
        from: "db",
      },
    };

    if (rootKey && subKey) CacheStorage.add(rootKey, subKey, resp);

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    CacheStorage.del(RedisKeys.TASKS);

    res.status(201).json({
      body: { task: {} },
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateById: RequestHandler = async (req, res, next) => {
  try {
    CacheStorage.del(RedisKeys.TASKS);

    res.status(200).json({
      body: { task: {} },
      meta: {
        url: req.originalUrl,
        ok: true,
        effected: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    CacheStorage.del(RedisKeys.TASKS);

    res.status(200).json({
      meta: {
        url: req.originalUrl,
        ok: true,
        effected: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
