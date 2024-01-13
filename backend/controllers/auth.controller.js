import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async(req, res) => {
    const {email, password} = req.body;
    try{
        
        //let user = await User.findOne({email});
        //if (user) throw ({code: 11000});
        
        const user = new User({email, password});
        await user.save();

        // jwt token
        const {token, expiresIn} = generateToken(user.id);
        generateRefreshToken(user.id, res);

        return res.status(201).json({token, expiresIn});

    }catch(error){
        if (error.code === 11000){
            return res.status(400).json({error: "This user already exists"})
        }
        return res.status(500).json({error: "server error"})
    }
};

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user) return res.status(404).json({error: "That user doesn't exists"});

        const responsePassword = await user.comparePassword(password);
        if (!responsePassword){
            return res.status(403).json({error: "Incorrect credentials"});
        }

        // Generate token JWT
        const {token, expiresIn} = generateToken(user.id); // or _id
    
        generateRefreshToken(user.id, res);

        return res.json({ token, expiresIn });
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "server error"});
    }
};

export const formLogin = (req, res) => {
    res.render("login");
}

export const infoUser = async(req, res) => {
    try{
        const user = await User.findById(req.uid).lean();
        res.json({ email: user.email, uid: user._id });
    }catch(error){
        return res.status(500).json({error: "server error"});
    };
}

export const refreshToken = (req, res) => {

    try{
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    }catch(err){
        return res.status(401).send({error: err.message});
    }

};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ok: true});
};