import { Request, Response, NextFunction } from "express";
import Redis from "../redis/client";

const redis = Redis.getClient();

export const cache = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { page = "", limit = "" } = req.query;

    const url = req.originalUrl;

    const keys = url.split(/(?<=\/api\/)([a-zA-Z]+)(?=.*)/g);

    const rootKey = keys[1];
    let subKey = keys[2] || "index";

    if (page) {
      subKey = subKey.split("page=")[0];
      subKey = `${page}z${limit}${subKey}`;
    }

    const data = await redis.hGet(rootKey, subKey);

    if (data) {
      const resp = JSON.parse(data);
      resp.meta["from"] = "redis";

      return res.status(200).json(resp);
    }

    req.params.rootKey = rootKey;
    req.params.subKey = subKey;

    next();
  };
};
