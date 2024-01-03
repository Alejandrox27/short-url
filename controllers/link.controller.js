import { Link } from "../models/Link.js"
import { nanoid } from "nanoid";

export const getLinks = async (req, res) => {
    try{
        const links = await Link.find({uid: req.uid});

        return res.json({links});
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Server error"});
    }
};

export const createLink = async (req, res) => {
    try{
        const { longLink } = req.body;

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})

        return res.json({longLink})
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Server error"});
    }
}