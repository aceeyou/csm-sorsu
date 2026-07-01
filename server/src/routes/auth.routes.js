import express from "express";
import User from "../models/User.js";
import {
  LoginUser,
  RegisterUser,
  SendResetPasswordEmail,
  VerifyOTP,
  ResetPassword,
} from "../controllers/Auth.controller.js";
import { verification } from "../middleware/auth.js";
import cors from "cors";

const authRouter = express.Router();

authRouter.use(cors());

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);
authRouter.post("/send-otp", SendResetPasswordEmail);
authRouter.post("/verify-otp", VerifyOTP);
authRouter.post("/reset-password", ResetPassword);
authRouter.get("/me", verification, async (req, res) => {
  res.status(200).json(req.user);
});

export default authRouter;
