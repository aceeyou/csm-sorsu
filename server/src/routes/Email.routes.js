import express from "express";
import {
  AddAllowedEmail,
  GetAllowedEmail,
  ToggleEmailPrivelages,
  UpdateEmailAddress,
  EmailAvailability,
  UpdateUserRole,
} from "../controllers/AllowedEmail.controller.js";
import { authorize, verification } from "../middleware/auth.js";

const emailRouter = express.Router();

emailRouter.get(
  "/allowedemail",
  verification,
  authorize(["admin"]),
  GetAllowedEmail,
);
emailRouter.post(
  "/addemail",
  verification,
  authorize(["admin"]),
  AddAllowedEmail,
);
emailRouter.post(
  "/toggleemailprivelages",
  verification,
  authorize(["admin"]),
  ToggleEmailPrivelages,
);
emailRouter.post(
  "/updateemailaddress",
  verification,
  authorize(["admin"]),
  UpdateEmailAddress,
);
emailRouter.post(
  "/emailavailability",
  verification,
  authorize(["admin"]),
  EmailAvailability,
);
emailRouter.patch(
  "/updateuserrole",
  verification,
  authorize(["admin"]),
  UpdateUserRole,
);

export default emailRouter;
