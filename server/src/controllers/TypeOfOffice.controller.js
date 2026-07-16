import Service from "../models/Service.js";
import TypeOfOffice from "../models/TypeOfOffice.js";

export async function fetchTypesList(req, res) {
  try {
    const typesOffices = await TypeOfOffice.find()
      .select("-_id type isActive")
      .sort({ type: 1 });
    const types = typesOffices.map((type) => type.type);
    // console.log(types);

    // MANUALLY ADDED isActive PROPERTY TO ALL DOCUMENTS
    // await TypeOfOffice.updateMany(
    //   { isActive: { $exists: false } }, // Query: Find documents missing this property
    //   { $set: { isActive: true } }, // Update: Set the property value
    // );

    if (typesOffices) {
      return res.status(200).json({
        message: "Successfully fetched all types",
        types: [...types],
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function searchType(req, res) {
  const { query } = req.body;

  try {
    const find = await TypeOfOffice.find({
      type: { $regex: query, $options: "i" },
    });
    // console.log("query result: ", find);
    res.status(200).json({ query: find });
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTypes(req, res) {
  try {
    const typesOffices = await TypeOfOffice.find({ isActive: true })
      .select("_id type isActive")
      .sort({ type: 1 });
    if (typesOffices) {
      return res.status(200).json({
        types: typesOffices,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateType(req, res) {
  const { id } = req.params;
  const { type } = req.body;
  console.log("update type: ", id);
  try {
    const typeExists = await TypeOfOffice.findOne({ type });
    if (!typeExists) {
      const toUpdate = await TypeOfOffice.findByIdAndUpdate(
        { _id: id },
        { type },
      );
      if (toUpdate) {
        return res.status(200).json({
          message: "Succesfully updated office type.",
          officeType: toUpdate,
        });
      }
    }

    if (typeExists) {
      if (typeExists?._id !== id) {
        return res.status(400).json({
          message: "Office type already exist. Please try another name.",
        });
      }
      const toUpdate = await TypeOfOffice.findByIdAndUpdate(
        { _id: id },
        { type },
      );
      if (toUpdate) {
        return res.status(200).json({
          message: "Succesfully updated office type.",
          officeType: toUpdate,
        });
      }
    }

    return res.status(400).json({
      message: "Office type already exist. Please try another name.",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addType(req, res) {
  const { type } = req.body;
  try {
    if (!type)
      return res
        .status(400)
        .json({ message: "Required input. Please try again." });

    const typeExists = await TypeOfOffice.findOne({ type });
    if (typeExists && typeExists?.isActive) {
      return res
        .status(400)
        .json({ message: "Type already exists. Please try again." });
    } else if ((typeExists && !typeExists?.isActive) || !typeExists) {
      const typeOffice = await TypeOfOffice.create({
        type,
        isActive: true,
      });
      if (typeOffice)
        return res
          .status(201)
          .json({ message: "Successfully added " + type, id: typeOffice._id });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DeactivateOfficeType(req, res) {
  const { id } = req.params;
  const { type } = req.body;

  console.log(id);
  console.log(type);
  try {
    if (!id)
      return res
        .status(400)
        .json({ message: "Office type not found. Please try again." });

    const typeExists = await TypeOfOffice.findOne({ _id: id });
    if (!typeExists)
      return res
        .status(400)
        .json({ message: "Office type not found. Please try again." });

    const deactivatedType = await TypeOfOffice.findByIdAndUpdate(id, {
      isActive: false,
    });

    if (deactivatedType) {
      const serviceRelated = await Service.findOne({ typeID: id });
      if (!serviceRelated) {
        return res
          .status(400)
          .json({ message: "Services not found. Please try again." });
      }
      serviceRelated.isActive = false;
      serviceRelated.save();
      // const deactivateServicesRelated = await Service.findByIdAndUpdate(
      //   { typeID: id },
      //   { isActive: false },
      // );
      return res.status(200).json({
        message: "Successfully deactivated office type and services.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Deletion failed. Please try again." });
  }
}
