import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/bookings/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    fetchBookings();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 bg-gray-100 rounded">
            {b.tour && (
              <p>
                <b>Tour:</b> {b.tour.title}
              </p>
            )}
            {b.car && (
              <p>
                <b>Car:</b> {b.car.carType}
              </p>
            )}
            <p>
              <b>User:</b> {b.user.name} ({b.user.phone})
            </p>
            <p>
              <b>Date:</b> {new Date(b.date).toLocaleDateString()}
            </p>
            <p>
              <b>Status:</b> {b.status}
            </p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => updateStatus(b._id, "Confirmed")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(b._id, "Cancelled")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
