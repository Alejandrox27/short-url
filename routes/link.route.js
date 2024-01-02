import { Router } from "express";
import { getLinks } from "../controllers/link.controller.js";
const router = Router();

// GET    /api/v1/links       all links
router.get("/", getLinks);

// GET    /api/v1/links/:id   single link
//POST    /api/v1/links       create link
//PATCH   /api/v1/links/:id   update link
//DELETE   /api/v1/links/:id  remove link

export default router;