import { Router } from "express";
import * as tasks from "../controllers/tasks.controller";
import { Role } from "../enums";
import { access, cache } from "../middlewares";

const router = Router();

router.get("/", access(), cache(), tasks.getAll);
router.get("/:id", access(), cache(), tasks.getById);

router.post("/", access(Role.ADMIN), tasks.create);

router.put("/:id", access(Role.ADMIN), tasks.updateById);

router.delete("/:id", access(Role.ADMIN), tasks.deleteById);

export default router;
