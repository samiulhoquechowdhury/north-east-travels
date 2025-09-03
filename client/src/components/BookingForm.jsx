import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function BookingForm({ tourId, carId, onSuccess }) {
  const { user } = useContext(AuthContext);

  const [travelers, setTravelers] = useState(1);
  const [date, setDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [specialRequests, setSpecialRequests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          tourId,
          carId,
          travelers,
          date,
          pickupLocation,
          phone,
          specialRequests,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Booking Confirmed! Status: Pending. Admin will confirm soon.");
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

      <label className="block mb-2">Travelers *</label>
      <input
        type="number"
        value={travelers}
        onChange={(e) => setTravelers(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        required
      />

      <label className="block mb-2">Date *</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        required
      />

      <label className="block mb-2">Pickup Location *</label>
      <input
        type="text"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        required
      />

      <label className="block mb-2">Phone *</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
        required
      />

      <label className="block mb-2">Special Requests</label>
      <textarea
        value={specialRequests}
        onChange={(e) => setSpecialRequests(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full"
      >
        Confirm Booking
      </button>
    </form>
  );
}
