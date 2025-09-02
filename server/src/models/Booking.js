const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" }, // optional
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, // optional
    travelers: { type: Number, required: true },
    date: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    phone: { type: String, required: true },
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
