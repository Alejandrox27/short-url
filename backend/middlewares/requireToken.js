import Jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try{
        let token = req.headers?.authorization;
        if(!token) throw new Error("the token doesn't exists, use Bearer.");
        
        token = token.split(" ")[1];
        const {uid, verified} = Jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) throw new Error("The user is not verified. Verify your account first with the email");
        
        req.uid = uid;

        next();
    }catch(error){
        return res.status(401).json({error: error.message});
    }
}