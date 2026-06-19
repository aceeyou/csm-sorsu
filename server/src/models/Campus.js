import mongoose from "mongoose";

const campus = new mongoose.Schema(
  {
    campus: { type: String, unique: true, required: true },
  },
  { timestamps: true, strict: true },
);

const Campus = mongoose.model("Campus", campus);
export default Campus;
