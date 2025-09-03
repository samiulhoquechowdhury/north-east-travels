const Tour = require("../models/Tour");

// @desc    Get all tours
// @desc    Get all tours with search & filter
exports.getTours = async (req, res) => {
  try {
    const {
      search,
      type,
      minPrice,
      maxPrice,
      sortBy,
      page = 1,
      limit = 6,
    } = req.query;

    let query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    let tours = Tour.find(query);
    if (sortBy === "priceLow") tours = tours.sort({ price: 1 });
    if (sortBy === "priceHigh") tours = tours.sort({ price: -1 });

    const total = await Tour.countDocuments(query);
    const results = await tours.skip(skip).limit(Number(limit));

    res.json({
      results,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
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
