import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verification = async (req, res, next) => {
  let token;

  if (req.method === "OPTIONS") {
    return next();
  }

  // console.log("verification triggered");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // translates the token to readable string
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decoded.id).select("-password");

      // console.log("moving from verification");
      next();
    } catch (error) {
      res.status(401).json({ message: "User session expired. Please log in" });
    }
  }
};

export const authorize = (allowedRoles) => {
  // console.log("authorize triggered");
  // const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    // 1. Ensure user is authenticated (req.user should exist)
    // try {
    if (!req.user) {
      console.log("authorize (user):", req.user);
      res.status(401).json({ message: "Unauthorized" });
      next();
      return;
    }

    // 2. Check if the user's role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      // if (req.user.role !== "admin") {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      next();
      return;
    }

    // 3. Success: move to the next handler
    return next();
    // } catch (error) {
    //   next(error);
    //   console.log(error);
    // }
  };
};

export const generateToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
};
