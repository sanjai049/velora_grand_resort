import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user_id: mongoose.Types.ObjectId;
  room_id: mongoose.Types.ObjectId;
  check_in: Date;
  check_out: Date;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: Date;
}

const bookingSchema = new Schema<IBooking>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
