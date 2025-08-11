import express, { Request, Response } from "express";
import Lesson from "../models/Lesson";

const router = express.Router();

// Create Lesson
router.post("/", async (req: Request, res: Response) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    res.status(400).json({ error: errorMessage });
  }
});

// Get all lessons
router.get("/", async (_req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to fetch lessons";
    res.status(500).json({ error: errorMessage });
  }
});

// Get single lesson
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lesson);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Invalid lesson ID";
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
