const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const Car = require("../models/Car");
// const sendWhatsApp = require("../utils/sendWhatsApp");
const sendWhatsApp = require("../config/whatsapp");

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

    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      car: carId,
      travelers,
      date,
      pickupLocation,
      phone,
      specialRequests,
    });

    await booking.populate("user", "name phone email");
    await booking.populate("tour", "title");
    await booking.populate("car", "carType");

    // Custom WhatsApp messages
    const msg = booking.tour
      ? `📢 New Tour Booking!\nTour: ${booking.tour.title}\nName: ${booking.user.name}\nTravelers: ${booking.travelers}\nDate: ${booking.date}\nPickup: ${booking.pickupLocation}\nPhone: ${booking.phone}`
      : `📢 New Car Booking!\nCar: ${booking.car.carType}\nName: ${booking.user.name}\nDate: ${booking.date}\nPickup: ${booking.pickupLocation}\nPhone: ${booking.phone}`;

    // Send to Admin
    await sendWhatsApp(process.env.ADMIN_PHONE, msg);

    // Send confirmation to User
    await sendWhatsApp(
      booking.user.phone,
      `✅ Your booking request has been received!\nStatus: Pending\nWe’ll confirm shortly.`
    );

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
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name phone")
      .populate("tour car");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = req.body.status;
    await booking.save();

    // Custom WhatsApp for status update
    let msg = "";
    if (booking.status === "Confirmed") {
      msg = `🎉 Hi ${booking.user.name}, your booking is Confirmed!\n`;
    } else if (booking.status === "Cancelled") {
      msg = `❌ Hi ${booking.user.name}, your booking has been Cancelled.\n`;
    }

    if (booking.tour) msg += `Tour: ${booking.tour.title}`;
    if (booking.car) msg += `Car: ${booking.car.carType}`;
    msg += `\nStatus: ${booking.status}`;

    await sendWhatsApp(booking.user.phone, msg);

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
