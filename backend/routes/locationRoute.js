import express from "express";
import { addLocation, getAllLocations, updateLocation, deleteLocation } from "../controllers/locationController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, addLocation);
router.get("/all", getAllLocations);
router.put("/update/:id", isAuthenticated, isAdmin, updateLocation);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteLocation);

export default router;
