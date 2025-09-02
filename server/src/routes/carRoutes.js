const express = require("express");
const {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);

// Admin-only
router.post("/", protect, admin, createCar);
router.put("/:id", protect, admin, updateCar);
router.delete("/:id", protect, admin, deleteCar);

module.exports = router;
