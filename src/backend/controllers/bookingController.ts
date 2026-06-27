import { Response } from 'express';
import { Booking } from '../models/Booking';
import { Room } from '../models/Room';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { room_id, check_in, check_out } = req.body;

    const room = await Room.findById(room_id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
    
    if (nights <= 0) {
      return res.status(400).json({ message: 'Invalid dates' });
    }

    const total_price = nights * room.price_per_night;

    const booking = new Booking({
      user_id: req.user?._id,
      room_id,
      check_in: checkInDate,
      check_out: checkOutDate,
      total_price,
      status: 'pending'
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ user_id: req.user?._id }).populate('room_id');
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
