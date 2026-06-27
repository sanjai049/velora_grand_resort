import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  email: string;
  password_hash: string;
  admin_code: string;
  permissions: string[];
  is_active: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  admin_code: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    default: ['read', 'write'],
  },
  is_active: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

adminSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password_hash);
};

adminSchema.pre('save', async function(next: any) {
  if (!this.isModified('password_hash')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(this.password_hash, salt);
  next();
});

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
