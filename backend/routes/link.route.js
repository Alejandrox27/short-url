import { Router } from "express";
import { createLink, deleteLink, editLink, getLinks } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsValidator } from "../middlewares/validatorManager.js";
const router = Router();

// GET    /api/v1/links       all links
router.get("/", requireToken, getLinks);

//POST    /api/v1/links       create link
router.post("/", requireToken, bodyLinkValidator, createLink);

//PATCH   /api/v1/links/:id   update link
router.patch("/:id", requireToken, bodyLinkValidator, paramsValidator, editLink);

//DELETE   /api/v1/links/:id  remove link
router.delete("/:id", requireToken, paramsValidator, deleteLink);

export default router;