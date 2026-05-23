import express from "express";
import User from "../models/User.js";
import { LoginUser, RegisterUser } from "../controllers/Auth.controller.js";
import { verification } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);
authRouter.get("/me", async (req, res) => {
  res.status(200).json(req.user);
});

export default authRouter;
