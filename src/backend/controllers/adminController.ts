import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import { Room } from '../models/Room';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public (Requires admin code)
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password, admin_code } = req.body;

    if (admin_code !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ message: 'Invalid admin code' });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      email,
      password_hash: password,
      admin_code
    });

    if (admin) {
      const token = generateToken(res, admin._id.toString(), true);
      res.status(201).json({
        _id: admin._id,
        email: admin.email,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      if (!admin.is_active) {
         return res.status(403).json({ message: 'Admin account disabled' });
      }

      const token = generateToken(res, admin._id.toString(), true);
      res.json({
        _id: admin._id,
        email: admin.email,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeRooms = await Room.countDocuments({ availability: true });
    
    // Calculate total revenue
    const bookings = await Booking.find({ status: 'confirmed' });
    const totalRevenue = bookings.reduce((acc, curr) => acc + curr.total_price, 0);

    res.json({
      totalUsers,
      totalBookings,
      activeRooms,
      totalRevenue
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
