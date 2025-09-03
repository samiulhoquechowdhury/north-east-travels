const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent duplicate reviews (user can review a tour only once)
reviewSchema.index({ user: 1, tour: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
