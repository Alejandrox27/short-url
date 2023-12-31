import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
const router = express.Router();

router.post("/login", login)

router.post("/register", [
    body("email", "Not correct email").isEmail().normalizeEmail(),
], register)

export default router;