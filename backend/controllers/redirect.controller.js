import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
    try{
        const { nanoLink } = req.params;
        const link = await Link.findOne({ nanoLink });

        // front end return res.json()
        return res.redirect(link.longLink);
    }catch(error){
        console.log(error);
        return res.status(404).json({error: "That link doesn't exists"});
    }
}