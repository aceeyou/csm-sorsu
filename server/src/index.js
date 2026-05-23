import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import cors from "cors";
import { sheets } from "./config/googleAPI.config.js";
import { connectDB } from "./config/mongodb.config.js";
import User from "./models/User.js";

import spreadSheetRouter from "./routes/Spreadsheet.routes.js";
import authRouter from "./routes/auth.routes.js";
import emailRouter from "./routes/Email.routes.js";
import { verification } from "./middleware/auth.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Verify user token for all routes
app.use(verification);

// Register, Login amd User Infor endpoints
app.use("/auth", authRouter);

// Allowed email controller
app.use("/emails", emailRouter);

app.post("/postcsmresponse", async (req, res) => {
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

  res.json({ message: "Data recorded successfully!" });
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
