import { Location } from "../models/locationModel.js";

export const addLocation = async (req, res) => {
  try {
    const { name, district, stationCode, isStation } = req.body;
    if (!name || !district) {
      return res.status(400).json({
        success: false,
        message: "Name and district are required"
      });
    }

    const existingLocation = await Location.findOne({ name });
    if (existingLocation) {
      return res.status(400).json({
        success: false,
        message: "Location already exists"
      });
    }

    const newLocation = await Location.create({
      name,
      district,
      stationCode,
      isStation
    });

    return res.status(201).json({
      success: true,
      message: "Location added successfully",
      data: newLocation
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ name: 1 });
    return res.status(200).json({
      success: true,
      data: locations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLocation = await Location.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: updatedLocation
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Location deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
