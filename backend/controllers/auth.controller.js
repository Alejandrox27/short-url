import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";

export const register = async(req, res) => {
    const {email, password} = req.body;
    try{
        
        //let user = await User.findOne({email});
        //if (user) throw ({code: 11000});
        
        const user = new User({email, password});
        await user.save();

        // jwt token

        const {token, expiresIn} = generateToken(user.id, user.verified);

        generateRefreshToken(user.id, user.verified, res);

        // send email here:
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USEREMAIL,
              pass: process.env.PASSEMAIL,
            }
          });

        await transport.sendMail({
        from: '"Fred Foo 👻"', // sender address
        to: user.email, // list of receivers
        subject: "Verify your User", // Subject line
        html: `<a href="http://localhost:5000/api/v1/auth/verify/${token}">Verify user</a>`,
        });

        

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

        if(!user) return res.status(403).json({error: "Incorrect credentials"});

        const responsePassword = await user.comparePassword(password);
        if (!responsePassword){
            return res.status(403).json({error: "Incorrect credentials"});
        }

        // Generate token JWT
        const {token, expiresIn} = generateToken(user.id, user.verified); // or _id
    
        generateRefreshToken(user.id, user.verified, res);

        return res.json({ token, expiresIn });
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "server error"});
    }
};

export const infoUser = async(req, res) => {
    try{
        const user = await User.findById(req.uid).lean();
        res.json({ email: user.email, uid: user._id });
    }catch(error){
        return res.status(500).json({error: "server error"});
    };
}

export const verifyUser = async(req, res) => {
    try{
        const {token} = req.params;

        const {uid} = Jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByIdAndUpdate(uid, {verified: true});
        await user.save();

        return res.redirect("http://localhost:5173/dashboard")
    }catch(error){
        return res.status(500).json({error: "server error"});
    };
}

export const refreshToken = (req, res) => {
    try{
        const { token, expiresIn } = generateToken(req.uid, req.verified);
        return res.json({ token, expiresIn });
    }catch(err){
        return res.status(401).send({error: err.message});
    }

};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ok: true});
};