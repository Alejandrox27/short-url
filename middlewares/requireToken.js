import Jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try{
        //console.log(req.headers);
        const token = req.headers?.authorization;
        if(!token) throw new Error("the token doesn't exists, use Bearer.");
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({error: error.message});
    }
}