import { validationResult, body } from "express-validator";

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    };

    next();
}

export const bodyRegisterValidator = [
    body("email", "Not correct email").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({min:6}),
    body("password", "Invalid password").custom((value, {req}) => {
        if(value !== req.body.repassword){
            throw new Error("The passwords don't match");
        }
        return value;
    }),
    validationResultExpress
];

export const bodyLoginValidator = [
    body("email", "Not correct email").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({min:6}),
    validationResultExpress
];