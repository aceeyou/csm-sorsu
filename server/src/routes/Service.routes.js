import express from "express";
import {
  AddServices,
  DeactivateServicesOfType,
  FetchServicesOfType,
  GetServicesList,
  UpdateServices,
} from "../controllers/Service.controller.js";
import { authorize, verification } from "../middleware/auth.js";

const serviceRouter = express.Router();

const adminOnly = ["admin"];

serviceRouter.get("/", verification, GetServicesList);
serviceRouter.get("/:officetype", verification, FetchServicesOfType);
serviceRouter.post("/add", verification, AddServices);
serviceRouter.patch(
  "/update/:id",
  verification,
  authorize(["admin"]),
  UpdateServices,
);
serviceRouter.patch(
  "/deactivate/:id",
  verification,
  authorize(adminOnly),
  DeactivateServicesOfType,
);

export default serviceRouter;
