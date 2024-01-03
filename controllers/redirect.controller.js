import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
    try{
        const { nanoLink } = req.params;
        const link = await Link.findOne({ nanoLink });

        console.log(link);

        return res.json({ longLink: link.longLink });
    }catch(error){
        console.log(error);
        return res.status(404).json({error: "That link doesn't exists"});
    }
}