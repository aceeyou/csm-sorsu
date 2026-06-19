import express from "express";
import {
  AddOffice,
  GetOffices,
  LookForOffice,
  DeleteOffice,
  UpdateOffice,
} from "../controllers/Office.controller.js";
import { verification } from "../middleware/auth.js";

const officeRouter = express.Router();

officeRouter.get("/list", GetOffices);
officeRouter.post("/addoffice", AddOffice);
officeRouter.post("/query", LookForOffice);
officeRouter.patch("/update/:id", UpdateOffice);
officeRouter.delete("/delete/:id", DeleteOffice);

export default officeRouter;
