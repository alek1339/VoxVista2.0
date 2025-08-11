import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  email: string;
  firstName: string;
  lastName: string;
  dailyStreak: number;
  nativeLanguage: 'en' | 'bg';
  learningLanguage: 'de';
  isPremium: boolean;
  isAdmin: boolean;
  isActive: boolean;
  isVerified: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isGoogleVerified: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date;
  createdAt: Date;
  updatedAt: Date;
  learnedWords: mongoose.Types.ObjectId[]; // references WordProgress
  learnedGrammar: mongoose.Types.ObjectId[]; // references GrammarProgress
  learnedLessons: mongoose.Types.ObjectId[]; // Lesson IDs
  learnedExercises: mongoose.Types.ObjectId[]; // Exercise IDs
}

const userSchema = new Schema<IUser>({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dailyStreak: { type: Number, default: 0 },
  nativeLanguage: { type: String, required: true },
  learningLanguage: { type: String, enum: ['de'], default: 'de' },
  isPremium: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  isPhoneVerified: { type: Boolean, default: false },
  isGoogleVerified: { type: Boolean, default: false },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  learnedWords: [{ type: Schema.Types.ObjectId, ref: 'WordProgress' }],
  learnedGrammar: [{ type: Schema.Types.ObjectId, ref: 'GrammarProgress' }],
  learnedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  learnedExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model<IUser>('User', userSchema);
