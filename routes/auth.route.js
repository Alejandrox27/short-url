import {Router} from "express";
import { infoUser, login, register, refreshToken } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = Router();

router.post("/login", [
    body("email", "Not correct email").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({min:6}),
], validationResultExpress, login);

router.post("/register", [
    body("email", "Not correct email").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({min:6}),
    body("password", "Invalid password").custom((value, {req}) => {
        if(value !== req.body.repassword){
            throw new Error("The passwords don't match");
        }
        return value;
    }),
], validationResultExpress, register);

router.get("/protected", requireToken, infoUser);

router.get("/refresh", refreshToken)

export default router;