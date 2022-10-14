import { Router } from "express";
import * as users from "../controllers/users.controller";
import { Role } from "../enums";
import { access } from "../middlewares";

const router = Router();

router.get("/", access(Role.ADMIN), users.getAll);
router.get("/:id", access(Role.ADMIN), users.getById);

router.post("/", access(Role.ADMIN), users.create);

router.put("/:id", access(Role.ADMIN), users.updateById);

router.delete("/:id", access(Role.ADMIN), users.deleteById);

export default router;
