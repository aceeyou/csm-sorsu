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

const app = express();
dotenv.config();

const corsOptions = {
  origin: process.env.VITE_CLIENT_URL || "http://localhost:5173",
  // Explicitly allow the methods your frontend will use
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  // Allow custom headers like Content-Type (JSON) or Authorization (JWT tokens)
  allowedHeaders: ["Origin", "Content-Type", "Authorization"],
  // CRITICAL: Forces Express to respond to OPTIONS requests with a 200 OK status
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable pre-flight for all routes
// app.use((req, res, next) => {
//   // 1. Allow the origin making the request
//   // res.header("Access-Control-Allow-Origin", "https://csm-sorsu.vercel.app");
//   res.header(
//     "Access-Control-Allow-Origin",
//     process.env.VITE_CLIENT_URL || "http://localhost:5173",
//   );

//   // 2. Allow the headers your XHR request is sending
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Content-Type, Authorization",
//   );

//   // 3. Allow the POST method
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//   );

//   // 4. CRITICAL: If it's the preflight OPTIONS request, kill it here with a 200 OK!
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   // 5. Pass normal requests (GET, POST) onwards
//   next();
// });

app.use(express.json());

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
