import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  fromId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  toId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  // Snapshot fields to preserve data if original docs are deleted/modified
  busNumber: { type: String },
  busType: { type: String },
  fromName: { type: String },
  toName: { type: String },
  seats: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  travelDate: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now }
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);
