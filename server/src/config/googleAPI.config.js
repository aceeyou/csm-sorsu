import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json",
  // credentials: {
  // Replace literal escaped \n with real newlines for Vercel/Node compatibility
  // private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  // client_email: process.env.GOOGLE_CLIENT_EMAIL,
  // },
  projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

export const sheets = google.sheets({ version: "v4", auth });
