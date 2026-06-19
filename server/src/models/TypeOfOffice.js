import mongoose from "mongoose";

const typeOfOffice = new mongoose.Schema(
  {
    type: { type: String, unique: true, required: true },
  },
  { timestamps: true, strict: true },
);

const TypeOfOffice = mongoose.model("TypeOfOffice", typeOfOffice);
export default TypeOfOffice;
