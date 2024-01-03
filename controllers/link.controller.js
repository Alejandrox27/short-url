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

export const getLinkV1CRUD = async (req, res) => {
    try{
        const {id} = req.params;
        const link = await Link.findOne({_id : id, uid : req.uid});

        return res.json({link});
    }catch(error){
        console.log(error);
        return res.status(404).json({error: "That link doesn't exists"});
    }
};

export const createLink = async (req, res) => {
    try{
        let { longLink } = req.body;

        if (longLink.startsWith("http://")){
            longLink = "https://" + longLink.slice(7)
        }

        if(!longLink.startsWith("https://")){
            longLink = "https://" + longLink;
        } 

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid});
        const newLink = await link.save();

        return res.status(201).json({ newLink });
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Server error"});
    }
}

export const deleteLink = async (req, res) => {
    try{
        const {id} = req.params;

        const link = await Link.findOneAndDelete({ _id : id, uid : req.uid });

        return res.status(204).json({ msg: "link deleted" });
    }catch(error){
        console.log(error);
        return res.status(404).json({error: "That link doesn't exists"});
    }
}

export const editLink = async (req, res) => {
    try{
        const { id } = req.params;
        const { longLink } = req.body;

        const link = await Link.findOneAndUpdate({ _id : id, uid : req.uid }, { longLink });
        const newLink = await link.save();

        return res.status(200).json(newLink);
    }catch(error){
        console.log(error);
        return res.status(404).json({error: "That link doesn't exists"});
    }
}