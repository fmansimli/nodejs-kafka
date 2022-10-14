import { Router } from "express";
import * as admin from "../controllers/admin.controller";
import { Role } from "../enums";
import { access } from "../middlewares";

const router = Router();

router.get("/redis/keys", admin.getRedisKeys);
router.get("/redis/key-pairs", admin.getRedisKeyPairs);
router.get("/redis/stat", admin.getRedisStat);

router.get("/redis/keys/:rootKey", admin.getRedisSubKeys);

router.get("/redis/values/:rootKey", admin.getRedisValues);

router.post("/redis/values/:rootKey", admin.getRedisValue);

router.post("/create-index", access(Role.ADMIN), admin.createIndex);

router.delete("/drop-collection", access(Role.ADMIN), admin.dropColl);
router.delete("/drop-database", access(Role.ADMIN), admin.dropDatabase);

router.delete("/redis", admin.flushRedis);
router.delete("/redis-tables", admin.flushRedisTables);

router.delete("/redis/keys/:rootKey", admin.delSingleRootKey);

router.delete("/redis/keys/:rootKey/one", admin.delSingleKey);

export default router;
