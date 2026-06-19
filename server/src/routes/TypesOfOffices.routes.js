import express from "express";
import { addType, fetchTypes } from "../controllers/TypeOfOffice.controller.js";

const typesRouter = express.Router();

typesRouter.get("/list", fetchTypes);
typesRouter.post("/addtype", addType);

export default typesRouter;
