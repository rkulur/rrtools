import { Request, Response } from "express";
import { mdParser } from "../utility";

const mdToHTMLController = (req: Request, res: Response) => {
  const md = req.body.md;
  const htmlStr = mdParser(md);
  res.json({ success: "true", htmlStr });
};

export default mdToHTMLController;
