import { sheets } from "../config/googleAPI.config.js";

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
