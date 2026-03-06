import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  busType: {
    type: String,
    enum: ['Ordinary', 'Fast Passenger', 'Super Fast', 'Super Express', 'Minnal', 'Swift Deluxe', 'Scania', 'Volvo', 'Gajaraj', 'Low Floor AC'],
    required: true
  },
  totalSeats: { type: Number, required: true, default: 49 },
  route: [{
    station: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    arrivalTime: { type: String }, // Format: "HH:MM"
    departureTime: { type: String } // Format: "HH:MM"
  }],
  daysRunning: {
    type: [String],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  farePerKm: { type: Number, default: 1.0 }, // Simplified fare calculation
  basePrice: { type: Number, default: 249 } // Base price for seat selection
}, { timestamps: true });

export const Bus = mongoose.model("Bus", busSchema);
