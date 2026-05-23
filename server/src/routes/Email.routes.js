import express from "express";
import {
  AddAllowedEmail,
  GetAllowedEmail,
  ToggleEmailPrivelages,
} from "../controllers/AllowedEmail.controller.js";
import { authorize, verification } from "../middleware/auth.js";

const emailRouter = express.Router();

emailRouter.get("/allowedemail", authorize(["admin"]), GetAllowedEmail);
emailRouter.post("/addemail", authorize(["admin"]), AddAllowedEmail);
emailRouter.post("/allowtoggle", authorize(["admin"]), ToggleEmailPrivelages);

export default emailRouter;
