import express from "express";
import {
  addType,
  DeactivateOfficeType,
  fetchTypes,
  fetchTypesList,
  searchType,
  UpdateType,
} from "../controllers/TypeOfOffice.controller.js";
import { authorize, verification } from "../middleware/auth.js";

const typesRouter = express.Router();

typesRouter.get("/list", verification, fetchTypesList);
typesRouter.get("/list/all", verification, fetchTypes);
typesRouter.post("/addtype", verification, authorize(["admin"]), addType);
typesRouter.post("/query", searchType);
typesRouter.patch(
  "/update/:id",
  verification,
  authorize(["admin"]),
  UpdateType,
);
typesRouter.patch(
  "/deactivate/:id",
  verification,
  authorize(["admin"]),
  DeactivateOfficeType,
);

export default typesRouter;
