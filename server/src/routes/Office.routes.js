import express from "express";
import {
  AddOffice,
  GetOffices,
  LookForOffice,
  DeleteOffice,
  UpdateOffice,
  GetOfficesOfSelectedCampus,
} from "../controllers/Office.controller.js";
import { verification } from "../middleware/auth.js";

const officeRouter = express.Router();

officeRouter.get("/list", GetOffices);
officeRouter.get("/list/:campus", GetOfficesOfSelectedCampus);
officeRouter.post("/addoffice", AddOffice);
officeRouter.post("/query", LookForOffice);
officeRouter.patch("/update/:id", UpdateOffice);
officeRouter.delete("/delete/:id", DeleteOffice);

export default officeRouter;
