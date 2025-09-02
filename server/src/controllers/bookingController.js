const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const Car = require("../models/Car");
const sendWhatsApp = require("../utils/sendWhatsApp");

// @desc    Create a new booking (tour or car)
exports.createBooking = async (req, res) => {
  try {
    const {
      tourId,
      carId,
      travelers,
      date,
      pickupLocation,
      phone,
      specialRequests,
    } = req.body;

    if (!tourId && !carId) {
      return res.status(400).json({ message: "Tour or Car ID is required" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId || null,
      car: carId || null,
      travelers,
      date,
      pickupLocation,
      phone,
      specialRequests,
    });

    // Send WhatsApp notification to Admin
    let message = `📢 New Booking Received!\n`;
    if (tourId) {
      const tour = await Tour.findById(tourId);
      message += `Tour: ${tour.title}\n`;
    }
    if (carId) {
      const car = await Car.findById(carId);
      message += `Car: ${car.carType}\n`;
    }
    message += `Name: ${req.user.name}\nTravelers: ${travelers}\nDate: ${date}\nPickup: ${pickupLocation}\nPhone: ${phone}`;
    await sendWhatsApp(message);

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user’s own bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("tour")
      .populate("car");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Cancel booking (user)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Cancelled";
    await booking.save();

    // Notify admin
    await sendWhatsApp(
      `❌ Booking Cancelled!\nBooking ID: ${booking._id}\nUser: ${req.user.name}`
    );

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .populate("tour")
      .populate("car");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update booking status (Admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = req.body.status;
    await booking.save();

    // Notify user (optional via email or WhatsApp)
    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
