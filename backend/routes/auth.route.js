import {Router} from "express";
import { login, register, refreshToken, verifyUser, logout, resendEmail } from "../controllers/auth.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefresh.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const router = Router();

router.post("/login", bodyLoginValidator, login);
router.post("/register", bodyRegisterValidator, register);
router.post("/resendemail", resendEmail);

router.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", logout);

router.get("/verify/:token", verifyUser);

export default router;