import express from "express";
import cors from "cors";
import {
  SpreadsheetController,
  FetchCampusesController,
} from "../controllers/Spreadsheet.controller.js";

const router = express.Router();

router.get("/campuses", FetchCampusesController);

export default router;
