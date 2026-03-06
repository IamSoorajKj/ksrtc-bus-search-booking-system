import express from "express";
import { addBus, getAllBuses, searchBuses, updateBus, deleteBus } from "../controllers/busController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, addBus);
router.get("/all", getAllBuses);
router.get("/search", isAuthenticated, searchBuses);
router.put("/update/:id", isAuthenticated, isAdmin, updateBus);
router.delete("/delete/:id", isAuthenticated, isAdmin, deleteBus);

export default router;
