const Tour = require("../models/Tour");
const Car = require("../models/Car");

// @desc   Get SEO metadata for a tour
exports.getTourMeta = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json({
      title: `${tour.title} | Travel Portal`,
      description: tour.description.slice(0, 150) + "...",
      keywords: [tour.title, tour.type, "Travel", "Tour Package"].join(", "),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get SEO metadata for a car
exports.getCarMeta = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    res.json({
      title: `${car.carType} Rental | Travel Portal`,
      description: `Book ${car.carType} with ${car.seatCapacity} seats, ${car.engineType} engine.`,
      keywords: [car.carType, "Car Rental", "Travel Car"].join(", "),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
