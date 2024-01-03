import { validationResult, body } from "express-validator";
import axios from "axios";

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


export const bodyLinkValidator = [
    body("longLink", "The URL is not valid").trim().notEmpty()
    .custom(async (value) => {
        try{
            if (value.startsWith("http://")){
                value = "https://" + value.slice(7)
            }

            if(!value.startsWith("https://")){
                value = "https://" + value;
            } 

            await axios.get(value);
            return value;
        }catch(error){
            throw new Error("Not found longLink 404");
        }
    }),
    validationResultExpress
]

export const bodyLoginValidator = [
    body("email", "Not correct email").trim().isEmail().normalizeEmail(),
    body("password", "Min 6 characters").trim().isLength({min:6}),
    validationResultExpress
];