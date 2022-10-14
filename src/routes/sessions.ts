import { Router } from "express";
import * as sessions from "../controllers/sessions.controller";
import { Role } from "../enums";
import { access } from "../middlewares";

const router = Router();

router.get("/", sessions.getAll);
router.get("/:id", sessions.getById);

router.post("/", sessions.create);

router.put("/:id", sessions.updateById);

router.delete("/:id", sessions.deleteById);

export default router;
