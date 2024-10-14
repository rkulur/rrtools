import express, { Router } from "express";
import mdToHTMLController from "../controllers/mdToHTMLController";

const router = Router();

router.post("/mdtohtml", mdToHTMLController);

export default router;
