import express from 'express';
import { registerAdmin, loginAdmin, getDashboardStats } from '../controllers/adminController';
import { adminProtect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/stats', adminProtect, getDashboardStats);

export default router;
