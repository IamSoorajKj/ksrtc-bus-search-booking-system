import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/createOrder', isAuthenticated, createOrder);
router.post('/verifyPayment', isAuthenticated, verifyPayment);

export default router;
