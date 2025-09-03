const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const Car = require("../models/Car");

// @desc   Get overall stats
exports.getStats = async (req, res) => {
  try {
    const totalTours = await Tour.countDocuments();
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();

    res.json({ totalTours, totalCars, totalBookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get most booked tours
exports.getTopTours = async (req, res) => {
  try {
    const topTours = await Booking.aggregate([
      { $match: { tour: { $ne: null } } },
      { $group: { _id: "$tour", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const tours = await Tour.find({ _id: { $in: topTours.map((t) => t._id) } });

    res.json({ topTours, tours });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get most booked cars
exports.getTopCars = async (req, res) => {
  try {
    const topCars = await Booking.aggregate([
      { $match: { car: { $ne: null } } },
      { $group: { _id: "$car", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const cars = await Car.find({ _id: { $in: topCars.map((c) => c._id) } });

    res.json({ topCars, cars });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Monthly bookings (for chart)
exports.getMonthlyBookings = async (req, res) => {
  try {
    const monthly = await Booking.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(monthly);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Car type distribution (pie chart)
exports.getCarTypeDistribution = async (req, res) => {
  try {
    const distribution = await Car.aggregate([
      { $group: { _id: "$carType", count: { $sum: 1 } } },
    ]);

    res.json(distribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
