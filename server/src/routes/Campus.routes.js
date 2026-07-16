import express from "express";
import { AddCampus, GetCampuses } from "../controllers/Campus.controller.js";
import { authorize } from "../middleware/auth.js";
const campusRouter = express.Router();

campusRouter.get("/list", GetCampuses);
campusRouter.post("/addcampus", authorize(["admin"]), AddCampus);

export default campusRouter;
