import mongoose from "mongoose";

const typeOfOffice = new mongoose.Schema(
  {
    type: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true, strict: true },
);

const TypeOfOffice = mongoose.model("TypeOfOffice", typeOfOffice);
export default TypeOfOffice;
