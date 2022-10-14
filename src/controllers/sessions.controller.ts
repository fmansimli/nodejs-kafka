import { RequestHandler } from "express";

export const getAll: RequestHandler = async (req, res, next) => {
  const { limit = 5, page = 1, fields, ...query } = req.query;

  try {
    res.status(200).json({
      body: {},
      pagination: {},
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({
      body: {},
      meta: {
        url: req.originalUrl,
        ok: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json({
      body: {},
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
    res.status(200).json({
      body: {},
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
