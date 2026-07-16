import express from "express";
import { verification } from "../middleware/auth.js";
import cors from "cors";
import { PostTally } from "../controllers/Tally.controller.js";

const tallyRouter = express.Router();

tallyRouter.post("/post", PostTally);

export default tallyRouter;
