import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json(), cors());
dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({ version: "v4", auth });

app.post("/postcsmresponse", async (req, res) => {
  const row = Object.values(req.body);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Encoded Data!A2:T",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.log(error);
  }

  res.json({ message: "Data recorded successfully!" });
});

app.listen(1337, (req, res) => {
  console.log("Listening on port 1337");
});
