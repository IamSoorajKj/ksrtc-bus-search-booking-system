import { Bus } from "../models/busModel.js";
import { Location } from "../models/locationModel.js";
import { fetchKSRTCLiveBuses } from "../services/ksrtcProvider.js";

export const addBus = async (req, res) => {
  try {
    const { busNumber, busType, totalSeats, route, daysRunning, farePerKm, basePrice } = req.body;
    if (!busNumber || !busType || !totalSeats) {
      return res.status(400).json({
        success: false,
        message: "Bus number, type and total seats are required"
      });
    }

    const existingBus = await Bus.findOne({ busNumber });
    if (existingBus) {
      return res.status(400).json({
        success: false,
        message: "Bus with this number already exists"
      });
    }

    const newBus = await Bus.create({
      busNumber,
      busType,
      totalSeats,
      route,
      daysRunning,
      farePerKm,
      basePrice
    });

    return res.status(201).json({
      success: true,
      message: "Bus added successfully",
      data: newBus
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().populate('route.station');
    return res.status(200).json({
      success: true,
      data: buses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: "From, to and date are required"
      });
    }

    // 1. Get Location names for Live API mapping
    const fromLoc = await Location.findById(from);
    const toLoc = await Location.findById(to);

    // 2. Attempt to fetch from Official KSRTC API
    let liveBuses = [];
    if (fromLoc && toLoc) {
      const liveData = await fetchKSRTCLiveBuses(fromLoc.name, toLoc.name, date);
      if (liveData) {
        liveBuses = liveData;
      }
    }

    // 3. Fallback/Complement with local DB results
    // Use UTC to ensure the day matches the YYYY-MM-DD input string exactly
    const searchDate = new Date(date);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'UTC' }).format(searchDate);

    const today = new Date();
    const isToday = searchDate.getUTCFullYear() === today.getFullYear() &&
      searchDate.getUTCMonth() === today.getMonth() &&
      searchDate.getUTCDate() === today.getDate();

    const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

    const localBuses = await Bus.find({
      daysRunning: dayOfWeek,
      'route.station': { $all: [from, to] }
    }).populate('route.station');

    // Filter local buses where 'from' appears before 'to'
    const matchingLocalBuses = localBuses.filter(bus => {
      const fromIndex = bus.route.findIndex(r => r.station._id.toString() === from);
      const toIndex = bus.route.findIndex(r => r.station._id.toString() === to);

      if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) return false;

      if (isToday) {
        const departureAtFrom = bus.route[fromIndex].departureTime;
        if (departureAtFrom < currentTime) return false;
      }

      return true;
    }).map(bus => {
      const busObj = bus.toObject();
      if (isToday) {
        const statuses = ["On time", "Delayed 5m", "Departing soon", "On time"];
        busObj.liveStatus = busObj.liveStatus || statuses[Math.floor(Math.random() * statuses.length)];
      } else {
        busObj.liveStatus = "Scheduled";
      }
      return busObj;
    });

    // 4. Merge results (Live results first)
    const allResults = [...liveBuses, ...matchingLocalBuses];

    return res.status(200).json({
      success: true,
      count: allResults.length,
      data: allResults
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Bus updated successfully",
      data: updatedBus
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Bus deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
