import mongoose, { Schema, Document } from 'mongoose';

export interface IGrammar extends Document {
  title: string;
  explanation: string;
  examples: string[];
}

const GrammarSchema = new Schema<IGrammar>({
  title: { type: String, required: true },
  explanation: { type: String, required: true },
  examples: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IGrammar>('Grammar', GrammarSchema);
