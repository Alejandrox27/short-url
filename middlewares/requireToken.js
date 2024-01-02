import Jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try{
        console.log(req.headers);
    }catch(error){
        console.log(error);
    }
}