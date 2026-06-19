import express from "express";
import cors from "cors";
import {
  SpreadsheetController,
  FetchCampusesController,
  DownloadSpreadSheetController,
} from "../controllers/Spreadsheet.controller.js";

const spreadSheetRouter = express.Router();

spreadSheetRouter.get("/download", DownloadSpreadSheetController);

export default spreadSheetRouter;
