import express from "express";
import {
  AddOffice,
  GetOffices,
  LookForOffice,
  DeleteOffice,
  UpdateOffice,
  GetOfficesOfSelectedCampus,
} from "../controllers/Office.controller.js";
import { verification, authorize } from "../middleware/auth.js";

const officeRouter = express.Router();

officeRouter.get("/list", GetOffices);
officeRouter.post("/query", LookForOffice);
officeRouter.get("/list/:campus", GetOfficesOfSelectedCampus);
officeRouter.post("/addoffice", authorize(["admin"]), AddOffice);
officeRouter.patch("/update/:id", authorize(["admin"]), UpdateOffice);
officeRouter.delete("/delete/:id", authorize(["admin"]), DeleteOffice);

export default officeRouter;
