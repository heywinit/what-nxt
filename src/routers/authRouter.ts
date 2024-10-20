import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import constants from "../utils/constants";
import { userRepo } from "../database/database";

const router = express.Router();
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if identifier (username or email) and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Determine if the identifier is an email or a username
    let user = await userRepo.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exist", success: false });
    }

    // Validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      constants.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user details and token
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        events: user.events,
      },
      success: true,
    });
  } catch (e) {
    console.error("Login error:", e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Check if the email already exists
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
        success: false,
      });
    }
    // Create a new user and save it to the database
    const newUser = await userRepo.create({
      email,
      events: [],
    });

    await newUser.setPassword(password);

    // Generate JWT token for the newly registered user
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      constants.JWT_SECRET,
      { expiresIn: "24h" }
    );

    await userRepo.save(newUser);

    // Return the token and user details
    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        events: newUser.events,
      },
      success: true,
    });
  } catch (e) {
    console.error("Registration error:", e);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});

export default router;
