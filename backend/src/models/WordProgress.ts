import mongoose, { Schema, Document } from 'mongoose';

export interface IWordProgress extends Document {
  user: mongoose.Types.ObjectId;
  word: mongoose.Types.ObjectId;
  level: number; // 0-5 (like Memrise stages)
  nextReview: Date;
}

const WordProgressSchema = new Schema<IWordProgress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  word: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  level: { type: Number, default: 0 },
  nextReview: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model<IWordProgress>('WordProgress', WordProgressSchema);
