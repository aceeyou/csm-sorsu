import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const authSheets = new google.auth.GoogleAuth({
  keyFile: "./credentialsSheets.json",
  // credentials: {
  // Replace literal escaped \n with real newlines for Vercel/Node compatibility
  // private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  // client_email: process.env.GOOGLE_CLIENT_EMAIL,
  // },
  // projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const authDrive = new google.auth.GoogleAuth({
  keyFile: "./credentialsDrive.json",
  // credentials: {
  // Replace literal escaped \n with real newlines for Vercel/Node compatibility
  // private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  // client_email: process.env.GOOGLE_CLIENT_EMAIL,
  // },
  // projectId: process.env.GOOGLE_PROJECT_ID,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const authClientSheet = await authSheets.getClient();
const authClientDrive = await authDrive.getClient();

export const sheets = google.sheets({ version: "v4", auth: authClientSheet });
export const drive = google.drive({ version: "v3", auth: authClientDrive });
