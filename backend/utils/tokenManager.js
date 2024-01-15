import jwt from "jsonwebtoken";

export const generateToken = (uid, verified) => {
    const expiresIn = 60 * 15

    try{
        const token = jwt.sign({uid, verified}, process.env.JWT_SECRET, { expiresIn });
        return {token, expiresIn}
    }catch(error){
        return res.status(401).json("Unauthorized user or user doesn't exists");
    }
}

export const generateRefreshToken = (uid, verified, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try{
        const refreshToken = jwt.sign({ uid, verified }, process.env.JWT_REFRESH, {expiresIn,});

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODE === "developer"),
            expires: new Date(Date.now() + (expiresIn * 1000))
        });

    }catch(error){
        return res.status(401).json("Unauthorized user or user doesn't exists");
    }
}