import mongoose, { Schema, Document } from 'mongoose';

export interface IGrammarProgress extends Document {
  user: mongoose.Types.ObjectId;
  grammar: mongoose.Types.ObjectId;
  level: number;
  nextReview: Date;
}

const GrammarProgressSchema = new Schema<IGrammarProgress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  grammar: { type: Schema.Types.ObjectId, ref: 'Grammar', required: true },
  level: { type: Number, default: 0 },
  nextReview: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model<IGrammarProgress>('GrammarProgress', GrammarProgressSchema);
