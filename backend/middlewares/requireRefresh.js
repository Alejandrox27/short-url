import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
    try{
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No Bearer");
    
        const { uid, verified } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);

        req.uid = uid;
        req.verified = verified;
        next();
    }catch(error){
        return res.status(401).json({error: error.message})
    }
};