import express from 'express';
import { getUserBookings, getBookedSeats } from '../controllers/bookingController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/my-bookings', isAuthenticated, getUserBookings);
router.get('/booked-seats', getBookedSeats);

export default router;
