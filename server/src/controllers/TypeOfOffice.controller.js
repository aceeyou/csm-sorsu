import TypeOfOffice from "../models/TypeOfOffice.js";

export async function fetchTypes(req, res) {
  try {
    const typesOffices = await TypeOfOffice.find()
      .select("-_id type")
      .sort({ type: 1 });
    const types = typesOffices.map((type) => type.type);
    // console.log(types);
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

export async function addType(req, res) {
  const { type } = req.body;
  try {
    if (!type)
      return res
        .status(400)
        .json({ message: "Required input. Please try again." });

    const typeExists = await TypeOfOffice.findOne({ type });
    // console.log(typeExists);
    if (typeExists)
      return res
        .status(400)
        .json({ message: "Type already exists. Please try again." });

    const typeOffice = await TypeOfOffice.create({
      type,
    });
    // console.log(typeOffice);
    if (typeOffice)
      return res.status(201).json({ message: "Successfully added " + type });
  } catch (error) {
    console.log(error);
  }
}
