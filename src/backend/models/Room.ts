import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
  type: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  images: string[];
  availability: boolean;
  description: string;
}

const roomSchema = new Schema<IRoom>({
  type: {
    type: String,
    required: true,
  },
  price_per_night: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export const Room = mongoose.model<IRoom>('Room', roomSchema);
