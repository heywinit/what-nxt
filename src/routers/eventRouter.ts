import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { eventRepo, userRepo } from "../database/database"; // Assuming you have an event repository
import jwt from "jsonwebtoken";
import constants from "../utils/constants";

const router = express.Router();

// Create event route
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, from, to, location } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    const userId = jwt.verify(token, constants.JWT_SECRET).id;
    const user = await userRepo.findOne(userId);

    const event = eventRepo.create({
      title,
      description,
      from,
      to,
      location,
      organizer: user,
    });

    await eventRepo.save(event);

    return res.status(201).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// Get all events
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const events = await eventRepo.find({
      relations: ["organizer"],
    });

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get event by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await eventRepo.findOne({
      where: { id },
      relations: ["organizer"],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
