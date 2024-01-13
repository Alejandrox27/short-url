import Jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try{
        let token = req.headers?.authorization;
        console.log("Received token: ", token);
        if(!token) throw new Error("the token doesn't exists, use Bearer.");
        
        token = token.split(" ")[1];
        const {uid} = Jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = uid;

        next();
    }catch(error){
        console.log(error.message);
        return res.status(401).send({error: error.message});
    }
}