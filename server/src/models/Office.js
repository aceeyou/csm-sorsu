import mongoose from "mongoose";

const office = new mongoose.Schema(
  {
    alias: { type: String, unique: true, required: true },
    office: { type: String, unique: true, required: true },
    campus: [{ type: String, required: true }],
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true },
);

const Office = mongoose.model("Office", office);
export default Office;
