import mongoose from "mongoose";

const service = new mongoose.Schema(
  {
    typeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeOfOffice",
      unique: true,
      required: true,
    },
    services: [{ type: String, required: true }],
    isActive: { type: Boolean, requried: true },
  },
  { timestamps: true, strict: true },
);

const Service = mongoose.model("Service", service);
export default Service;
