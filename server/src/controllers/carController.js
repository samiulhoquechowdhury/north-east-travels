const Car = require("../models/Car");

// @desc    Get all cars
// @desc    Get all cars with search & filter
exports.getCars = async (req, res) => {
  try {
    const {
      carType,
      engineType,
      seatCapacity,
      availability,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};

    if (carType) query.carType = { $regex: carType, $options: "i" };
    if (engineType) query.engineType = engineType;
    if (seatCapacity) query.seatCapacity = Number(seatCapacity);
    if (availability !== undefined)
      query.availability = availability === "true";
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const cars = await Car.find(query);
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
