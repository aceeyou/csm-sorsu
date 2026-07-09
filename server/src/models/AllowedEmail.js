import mongoose from "mongoose";

const allowedEmailSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    authorized: { type: Boolean, required: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true, strict: true },
);

const AllowedEmail = mongoose.model("AllowedEmail", allowedEmailSchema);
export default AllowedEmail;
