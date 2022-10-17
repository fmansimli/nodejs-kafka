import { Router } from "express";
import * as logs from "../controllers/logs.controller";
import { Role } from "../enums";
import { access } from "../middlewares";

const router = Router();

router.get("/", logs.getAll);
router.get("/:id", logs.getById);

router.post("/", access(Role.ADMIN), logs.create);

router.put("/:id", access(Role.ADMIN), logs.updateById);

router.delete("/:id", access(Role.ADMIN), logs.deleteById);

export default router;
