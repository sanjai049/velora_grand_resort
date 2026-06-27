import { Request, Response } from 'express';
import { Room } from '../models/Room';

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ availability: true });
    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single room
// @route   GET /api/rooms/:id
// @access  Public
export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
