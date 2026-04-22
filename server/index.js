import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json(), cors());
dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json",
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // Replace literal escaped \n with real newlines for Vercel/Node compatibility
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({ version: "v4", auth });

app.get("/", (req, res) => {
  res.send(
    "Welcome to CART Tallying System Server for the CSM Questionnaire Form",
  );
});

app.post("/postcsmresponse", async (req, res) => {
  const row = Object.values(req.body);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Encoded Data!B2:V",
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
