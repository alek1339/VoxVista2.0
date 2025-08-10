import mongoose, { Schema, Document } from 'mongoose';

export interface IWord extends Document {
  text: string;
  translation: string;
  sentences: string[]; // example sentences
}

const WordSchema = new Schema<IWord>({
  text: { type: String, required: true },
  translation: { type: String, required: true },
  sentences: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IWord>('Word', WordSchema);
