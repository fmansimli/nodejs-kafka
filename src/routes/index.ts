import { Router } from "express";
import authRouter from "./auth";
import accountRouter from "./account";
import usersRouter from "./users";
import adminRouter from "./admin";
import sessionRouter from "./sessions";
import tasksRouter from "./tasks";
import logsRouter from "./logs";

const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/users", usersRouter);
router.use("/sessions", sessionRouter);
router.use("/tasks", tasksRouter);
router.use("/logs", logsRouter);

router.use("/admiin", adminRouter);

export default router;
