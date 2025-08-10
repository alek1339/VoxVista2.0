import mongoose, { Schema, Document } from "mongoose";

interface IGap {
  id: string; // c1, c2, etc.
  correctAnswers: string[]; // can have multiple valid answers
  explanation?: string;
}

export interface IExercise extends Document {
  lessonId: mongoose.Types.ObjectId;
  type: "multiple-choice" | "fill-in" | "matching" | "listening" | "gap-fill";
  sentence?: string; // for gap-fill or listening
  question?: string; // for MCQ
  options?: string[];
  correctAnswer?: string | string[];
  gaps?: IGap[];
  audioUrl?: string;
  context?: string; // "shopping", "travel"
  tags?: string[]; // "past tense", "accusative"
}

const ExerciseSchema = new Schema<IExercise>(
  {
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    type: { type: String, required: true },
    sentence: String,
    question: String,
    options: [String],
    correctAnswer: Schema.Types.Mixed,
    gaps: [
      {
        id: String,
        correctAnswers: [String],
        explanation: String,
      },
    ],
    audioUrl: String,
    context: String,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IExercise>("Exercise", ExerciseSchema);
