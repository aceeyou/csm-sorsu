import mongoose from "mongoose";

const allowedEmailSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    allowed: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const AllowedEmail = mongoose.model("AllowedEmail", allowedEmailSchema);
export default AllowedEmail;
