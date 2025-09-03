const Tour = require("../models/Tour");

// @desc    Get all tours
// @desc    Get all tours with search & filter
exports.getTours = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, duration, type } = req.query;

    let query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (type) query.type = type;
    if (duration) query.duration = duration;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const tours = await Tour.find(query);
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single tour by ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new tour (Admin only)
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update tour (Admin only)
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete tour (Admin only)
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
