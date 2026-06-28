import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 8 },
    role: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  { timestamps: true, strict: true },
);

// hash the password before creating/updating a user
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  return;
});

// metho to check wether the entered password matches the password of the registered user
userSchema.methods.matchPassword = async function (submittedPassword) {
  return await bcrypt.compare(submittedPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
