import express from "express";
import Exercise from "../models/Exercise";

const router = express.Router();

// Create Exercise
router.post("/", async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Get exercises for a lesson
router.get("/lesson/:lessonId", async (req, res) => {
  const exercises = await Exercise.find({ lessonId: req.params.lessonId });
  res.json(exercises);
});

// Get single exercise
router.get("/:id", async (req, res) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) return res.status(404).json({ error: "Exercise not found" });
  res.json(exercise);
});

export default router;
