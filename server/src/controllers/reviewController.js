const Review = require("../models/Review");
const Tour = require("../models/Tour");

// @desc    Add a review (User)
exports.addReview = async (req, res) => {
  try {
    const { tourId, rating, review } = req.body;

    // Check if tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      user: req.user._id,
      tour: tourId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this tour" });
    }

    const newReview = await Review.create({
      user: req.user._id,
      tour: tourId,
      rating,
      review,
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get reviews for a tour
exports.getTourReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tour: req.params.tourId }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete review (Admin only)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
