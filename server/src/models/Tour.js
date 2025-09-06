const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ["Adventure", "Honeymoon", "Family", "General"],
      default: "General",
    },
    images: [{ type: String }], // array of image URLs
    highlights: [{ type: String }], // e.g. ["Waterfalls", "Caves"]
    itinerary: { type: String }, // long text itinerary
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);

// server/models/Tour.js
// import mongoose from "mongoose";

// const tourSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     type: {
//       type: String,
//       enum: ["Adventure", "Family", "Honeymoon"],
//       required: true,
//     },
//     duration: { type: String, required: true }, // e.g., "4 Days / 3 Nights"
//     price: { type: Number, required: true },
//     rating: { type: Number, default: 0 },
//     reviews: { type: Number, default: 0 },
//     description: { type: String },
//     places: [{ type: String }],
//     highlights: [{ type: String }],
//     images: [{ type: String }],
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Tour", tourSchema);
