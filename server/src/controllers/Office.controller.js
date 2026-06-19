import { ObjectId } from "mongodb";
import Campus from "../models/Campus.js";
import Office from "../models/Office.js";
import TypeOfOffice from "../models/TypeOfOffice.js";

export async function GetOffices(req, res) {
  try {
    const offices = await Office.find().sort({ office: 1 });
    // console.log(offices[0]);
    if (offices) {
      return await res.status(200).json({
        offices: [...offices],
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function LookForOffice(req, res) {
  const { query } = req.body;

  try {
    const find = await Office.find({
      office: { $regex: query, $options: "i" },
    });
    // console.log("query result: ", find);
    res.status(200).json({ query: find });
  } catch (error) {
    console.log(error);
  }
}

export async function AddOffice(req, res) {
  const { office, alias, campus, type } = req.body;

  console.log(req.body);

  try {
    if (!office || !alias || !campus || !type) {
      return res.status(400).json({ message: "Fields are blank. Try again." });
    }

    // Checks if the office and alias exists on the database
    const officeExists = await Office.findOne({ office });
    const aliasExists = await Office.findOne({ alias });
    if (officeExists)
      return res.status(400).json({
        message: "The office being added already exists in the database.",
      });
    if (aliasExists)
      return res.status(400).json({
        message: "The alias is already being used. Try again.",
      });

    // Checks if the campus exists
    if (campus) {
      for (let index = 0; index < campus.length; index++) {
        console.log(campus[index]);
        const campusAvailable = await Campus.findOne({ campus: campus[index] });
        if (!campusAvailable)
          return res.status(400).json({
            message: "One of the campuse/s selected is not available.",
          });
      }
    }

    // Checks if the selected type of office exists
    const typeAvailable = await TypeOfOffice.findOne({ type });
    if (!typeAvailable)
      return res
        .status(400)
        .json({ message: "Type does not exists. Try again." });

    // Creates the document for the proposed office
    const newOffice = await Office.create({
      office,
      alias,
      campus,
      type,
    });

    if (newOffice) {
      const offices = await Office.find();
      return res.status(201).json({ offices });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateOffice(req, res) {
  const id = req.params.id;
  const { office, alias, campus, type } = req.body;

  try {
    if (!office || !alias || campus.length === 0 || !type)
      return res.status(400).json({ message: "Edit failed. Try again." });

    // console.log("edited: ", req.body);
    const updatedOffice = await Office.findByIdAndUpdate(id, req.body);

    if (!updatedOffice) {
      return res.status(400).json({ message: "Edit failed. Try again." });
    }

    return res.status(200).json({ message: "Successfully updated ", office });
  } catch (error) {
    console.log(erro);
  }
}

export async function DeleteOffice(req, res) {
  const id = req.params.id;
  console.log("id: ", id);
  try {
    if (!id)
      return res
        .status(400)
        .json({ message: "Cannot find office. Please try again" });

    const officeExists = await Office.findByIdAndDelete({
      _id: id,
    });
    if (!officeExists)
      return res
        .status(400)
        .json({ message: "Cannot find office. Please try again" });

    return res.status(200).json({ message: "Successfully removed office. 🎉" });
  } catch (error) {
    console.log(error);
  }
}
