import User from "../models/User.js";
import { generateToken } from "../middleware/auth.js";
import AllowedEmail from "../models/AllowedEmail.js";

export async function RegisterUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Checks if all required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    // Checks if the email provided is added on the allowed list of emails
    const isEmailAllowed = await AllowedEmail.findOne({ email });
    if (!isEmailAllowed) {
      return res.status(400).json({
        message:
          "The email provided is not allowed. Please contact the admin to add your privelages",
      });
    }

    // Checks if the user/email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: `User with that email already exists` });
    }

    // Checks if the user provided at least 8 characters for their password
    if (password.length < 8) {
      return res.status(400).json({
        message:
          "Password is too short. Provide at least 8 characters to register",
      });
    }

    // If the registration data passess all the test, the system will now create the new user account in the database
    const user = await User.create({ name, email, password, role });
    const token = await generateToken(user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: "user",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function LoginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Checks if user provided email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide your email and password to login" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid password" });

    const token = await generateToken(user._id);
    // If credentials are valid, return the user data
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
