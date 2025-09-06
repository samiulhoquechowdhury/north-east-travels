// client/src/components/BookingForm.jsx
import { useState } from "react";

export default function BookingForm({ tour, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    passengers: 1,
    pickup: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    const whatsappNumber = "919876543210"; // ✅ Replace with your WhatsApp number (with country code, no +)
    const text = `🚖 Booking Request
-----------------
Tour: ${tour.title}
Name: ${form.name}
Phone: ${form.phone}
Passengers: ${form.passengers}
Pickup: ${form.pickup}
Special Note: ${form.message || "N/A"}

💰 Price: ₹${tour.price.toLocaleString("en-IN")}
🕒 Duration: ${tour.duration}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank"); // Open WhatsApp
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Booking for {tour.title}
        </h2>

        <div className="grid gap-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
          <input
            type="number"
            name="passengers"
            placeholder="No. of Passengers"
            value={form.passengers}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
          <input
            name="pickup"
            placeholder="Pickup Location"
            value={form.pickup}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
          <textarea
            name="message"
            placeholder="Special Message (Optional)"
            value={form.message}
            onChange={handleChange}
            className="border rounded-lg p-3 w-full"
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
