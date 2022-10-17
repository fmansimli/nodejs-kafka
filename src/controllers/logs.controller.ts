import { RequestHandler } from "express";
import { sendToLogs } from "../kafka/producers/logs.producer";

export const getAll: RequestHandler = async (req, res, next) => {
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

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const resp = {
      body: { task: {} },
      meta: {
        url: req.originalUrl,
        ok: true,
        from: "db",
      },
    };

    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    sendToLogs();

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
    sendToLogs();

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
