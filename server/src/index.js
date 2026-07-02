import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import User from "./models/User.js";

import { authorize, verification } from "./middleware/auth.js";

import { sheets } from "./config/googleAPI.config.js";
import { connectDB } from "./config/mongodb.config.js";

import spreadSheetRouter from "./routes/Spreadsheet.routes.js";
import authRouter from "./routes/auth.routes.js";
import emailRouter from "./routes/Email.routes.js";
import campusRouter from "./routes/Campus.routes.js";
import typesRouter from "./routes/TypesOfOffices.routes.js";
import officeRouter from "./routes/Office.routes.js";
import serviceRouter from "./routes/Service.routes.js";

const corsOptions = {
  origin: "https://csm-sorsu.vercel.app",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
// app.options("*", cors());
app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
  // 1. Set the standard CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://csm-sorsu.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // 2. Handle the Preflight OPTIONS request immediately with a 200 OK
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

// Verify user token for all routes
// app.use(verification);

// Register, Login amd User Infor endpoints
app.use("/api/auth", authRouter);
app.use("/api/spreadsheet", spreadSheetRouter);

// Allowed email controller
app.use("/api/emails", verification, emailRouter);

app.use("/api/campus", verification, campusRouter);
app.use("/api/officetype", typesRouter);
app.use("/api/offices", verification, officeRouter);
app.use("/api/services", serviceRouter);

app.post("/api/postcsmresponse", verification, async (req, res) => {
  const row = Object.values(req.body);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Encoded Data!A2:W",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "Data recorded successfully! 🎉" });
});

// Spreadsheet | Campuses
// app.use("/campuses", (req, res) => {
//   try {
//     const campuses = sheets.spreadsheets.values
//       .get({
//         spreadsheetId: process.env.SPREADSHEET_ID,
//         range: "CAMPUSES!A2:A",
//       })
//       .then((response) => {
//         console.log(response.data?.values);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

connectDB();
app.listen(1337, (req, res) => {
  console.log("Listening on port 1337");
});

export default app;
