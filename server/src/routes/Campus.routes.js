import express from "express";
import { AddCampus, GetCampuses } from "../controllers/Campus.controller.js";

const campusRouter = express.Router();

campusRouter.get("/list", GetCampuses);
campusRouter.post("/addcampus", AddCampus);

export default campusRouter;
