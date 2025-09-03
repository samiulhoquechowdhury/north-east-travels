import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/cancel/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      alert("Booking cancelled!");
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      // For now we just update localStorage (extend backend later if needed)
      const updatedUser = { ...user, phone };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated!");
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!user) return <p className="text-center mt-10">Please login first.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Update */}
      <form
        onSubmit={updateProfile}
        className="bg-white shadow-md rounded p-4 mb-8"
      >
        <h2 className="text-xl font-semibold mb-3">Update Profile</h2>
        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>

      {/* Bookings */}
      <h2 className="text-2xl font-semibold mb-3">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="border rounded-lg p-4 shadow bg-white">
              {b.tour && (
                <p>
                  <b>Tour:</b> {b.tour.title}
                </p>
              )}
              {b.car && (
                <p>
                  <b>Car:</b> {b.car.carType} ({b.car.seatCapacity} seats)
                </p>
              )}
              <p>
                <b>Date:</b> {new Date(b.date).toLocaleDateString()}
              </p>
              <p>
                <b>Travelers:</b> {b.travelers}
              </p>
              <p>
                <b>Pickup:</b> {b.pickupLocation}
              </p>
              <p>
                <b>Phone:</b> {b.phone}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    b.status === "Confirmed"
                      ? "bg-green-200 text-green-800"
                      : b.status === "Cancelled"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {b.status}
                </span>
              </p>

              {b.status === "Pending" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
