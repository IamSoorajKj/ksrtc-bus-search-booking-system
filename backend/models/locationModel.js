import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  stationCode: { type: String }, // Optional for now
  isStation: { type: Boolean, default: true }
}, { timestamps: true });

export const Location = mongoose.model("Location", locationSchema);
