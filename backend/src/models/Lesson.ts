import mongoose, { Schema, Document } from "mongoose";

interface IVocabItem {
  word: string;
  translation: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "phrase";
  audioUrl?: string;
  contexts: string[]; // multiple example sentences
}

interface IGrammarPoint {
  title: string;
  explanation: string;
  examples: string[]; // example sentences
  audioUrl?: string;
}

export interface ILesson extends Document {
  title: string;
  description?: string;
  level: "A1" | "A2" | "B1" | "B2";
  wordIds: mongoose.Types.ObjectId[];    // references Word
  grammarIds: mongoose.Types.ObjectId[]; // references Grammar
  exerciseIds: mongoose.Types.ObjectId[];// references Exercise
  order: number;
  imageUrl?: string;
}

const LessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  description: String,
  level: { type: String, enum: ["A1","A2","B1","B2"], required: true },
  wordIds: [{ type: Schema.Types.ObjectId, ref: "Word" }],
  grammarIds: [{ type: Schema.Types.ObjectId, ref: "Grammar" }],
  exerciseIds: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
  order: Number,
  imageUrl: String
}, { timestamps: true });


export default mongoose.model<ILesson>("Lesson", LessonSchema);
