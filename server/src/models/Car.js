const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carType: { type: String, required: true }, // Sedan, Hatchback, SUV
    engineType: { type: String, required: true }, // Petrol, Diesel, Electric
    seatCapacity: { type: Number, required: true },
    price: { type: Number, required: true }, // per day or per trip
    availability: { type: Boolean, default: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
