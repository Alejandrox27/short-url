import { User } from "../models/User.js";
import { generateToken } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const register = async(req, res) => {
    const {email, password} = req.body;
    try{
        
        //let user = await User.findOne({email});
        //if (user) throw ({code: 11000});
        
        const user = new User({email, password});
        await user.save();

        // jwt token

        return res.status(201).json({ok: true});

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
        const {token, expiresIn} = generateToken(user.id) // or _id

        return res.json({ token, expiresIn });
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "server error"})
    }
};


export const infoUser = async(req, res) => {
    try{
        const user = await User.findById(req.uid);
        res.json({user});
    }catch(error){

    };
}