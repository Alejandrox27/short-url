import { Router } from "express";
import { createLink, getLink, getLinks } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/links       all links
router.get("/", requireToken, getLinks);

// GET    /api/v1/links/:id   single link
router.get("/:id", requireToken, getLink)

//POST    /api/v1/links       create link
router.post("/", requireToken, bodyLinkValidator, createLink);
//PATCH   /api/v1/links/:id   update link
//DELETE   /api/v1/links/:id  remove link

export default router;