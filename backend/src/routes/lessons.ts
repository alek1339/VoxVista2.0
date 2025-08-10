import express from "express";
import Lesson from "../models/Lesson";

const router = express.Router();

// Create Lesson
router.post("/", async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Get all lessons
router.get("/", async (_req, res) => {
  const lessons = await Lesson.find();
  res.json(lessons);
});

// Get single lesson
router.get("/:id", async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).json({ error: "Lesson not found" });
  res.json(lesson);
});

export default router;
