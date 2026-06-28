import Campus from "../models/Campus.js";

export async function GetCampuses(req, res) {
  try {
    const campuses = await Campus.find().select("campus -_id code");
    // console.log("campus: ", campuses);
    // const list = campuses.map((campus) => campus.campus);
    if (campuses) return res.status(200).json({ listOfCampuses: campuses });
  } catch (error) {
    console.log(error);
  }
}

export async function AddCampus(req, res) {
  const { campus } = req.body;

  try {
    if (!campus)
      return res.status(401).json({ message: "Please enter a valid value" });

    const existing = await Campus.findOne({ campus });

    if (existing)
      return res
        .status(400)
        .json({ message: "Campus already added to the database" });

    const newCampus = await Campus.create({
      campus,
    });

    // console.log(newCampus);
    if (newCampus) {
      return res.status(201).json({ message: "Successfully added a campus" });
    }
  } catch (error) {
    res.status(400).json({ message: "Campus already added to the database" });
    console.log(error);
  }
}
