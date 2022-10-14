import { Router } from "express";
import * as account from "../controllers/account.controller";
import { access } from "../middlewares";

const router = Router();

router.get("/profile", access(), account.getProfile);

router.put("/profile", access(), account.updateProfile);

router.delete("/profile", access(), account.deleteProfile);
router.delete("/logout", access(), account.logout);

router.get("/sessions", access(), account.getSessions);
router.get("/sessions/me", access(), account.getSession);
router.get("/sessions/:id", access(), account.getSessionById);

router.delete("/sessions", access(), account.flushAllSession);
router.delete("/sessions/all", access(), account.logoutOthers);
router.delete("/sessions/:id", access(), account.delSession);

export default router;
