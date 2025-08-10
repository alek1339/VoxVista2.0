import express from 'express';
import User from '../models/User';

const router = express.Router();

// Mark lesson as completed
router.post('/:userId/lesson/:lessonId/complete', async (req, res) => {
  try {
    const { userId, lessonId } = req.params;
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { learnedLessons: lessonId } }, // add only if not already present
      { new: true }
    );
    res.json({ message: 'Lesson marked as completed' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Mark exercise as completed
router.post('/:userId/exercise/:exerciseId/complete', async (req, res) => {
  try {
    const { userId, exerciseId } = req.params;
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { learnedExercises: exerciseId } },
      { new: true }
    );
    res.json({ message: 'Exercise marked as completed' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get user progress
router.get('/:userId/progress', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('learnedLessons')
      .populate('learnedExercises')
      .populate('learnedWords')
      .populate('learnedGrammar');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
