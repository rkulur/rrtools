import express, { Request, Response } from "express";
import cors from "cors";
import { mdToHTMLRouter } from "./routes";
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Sheesh");
});

app.use("/", mdToHTMLRouter);

app.listen(3000, () => {
  console.log("Server connected");
});

export default app;
