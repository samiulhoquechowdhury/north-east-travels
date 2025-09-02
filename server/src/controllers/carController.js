const Car = require("../models/Car");

// @desc    Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single car
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create car (Admin only)
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update car (Admin only)
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete car (Admin only)
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
