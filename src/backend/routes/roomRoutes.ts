import express from 'express';
import { getRooms, getRoomById } from '../controllers/roomController';

const router = express.Router();

router.route('/').get(getRooms);
router.route('/:id').get(getRoomById);

export default router;
