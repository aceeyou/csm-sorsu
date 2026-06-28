import { sheets, drive } from "../config/googleAPI.config.js";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";

const downloadFolder = path.join(os.homedir(), "Downloads");
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __dirname = downloadFolder;

export function SpreadsheetController(req, res) {
  res.send("Hello, Spreadsheet Controller!");
}

export async function FetchCampusesController(req, res) {
  try {
    const campuses = await sheets.spreadsheets().values().get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "CAMPUSES!A2:B",
      majorDimension: "ROWS",
      // majorDimension='COLUMNS'
    });

    const rows = campuses.data.values;
    console.log(rows[0][0]);
    // return rows;

    // console.log(campuses.data.values);

    // res.send(rows);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch campuses data" });
  }
}

export async function DownloadSpreadSheetController(req, res) {
  try {
    const resDrive = await drive.files.export(
      {
        fileId: process.env.SPREADSHEET_ID,
        mimeType: process.env.SPREADSHEET_MIME_TYPE,
        alt: "media",
      },
      { responseType: "stream" },
    );

    // 3. Save the stream to a local file
    const dest = fs.createWriteStream(__dirname + "/CSMSorSU_Spreadsheet.csv");

    res.status(200).json({ message: "Spreadsheet download initiated." });
    resDrive.data
      .on("end", () => {
        console.log("Spreadsheet downloaded successfully.");
      })
      .on("error", (err) => console.error("Error downloading:", err))
      .pipe(dest);
  } catch (error) {
    console.error("Error downloading spreadsheet:", error);
  }
}
