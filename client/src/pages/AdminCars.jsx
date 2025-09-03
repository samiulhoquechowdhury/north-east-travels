import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminCars() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    carType: "",
    engineType: "",
    seatCapacity: "",
    price: "",
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars");
    setCars(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/cars", newCar, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchCars();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/cars/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchCars();
  };

  const toggleAvailability = async (id, current) => {
    await axios.put(
      `http://localhost:5000/api/cars/${id}`,
      { availability: !current },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    fetchCars();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Cars</h2>

      {/* Add New Car */}
      <form
        onSubmit={handleCreate}
        className="mb-6 space-y-3 bg-white shadow p-4 rounded"
      >
        <input
          type="text"
          placeholder="Car Type"
          className="border p-2 w-full"
          value={newCar.carType}
          onChange={(e) => setNewCar({ ...newCar, carType: e.target.value })}
        />
        <input
          type="text"
          placeholder="Engine Type"
          className="border p-2 w-full"
          value={newCar.engineType}
          onChange={(e) => setNewCar({ ...newCar, engineType: e.target.value })}
        />
        <input
          type="number"
          placeholder="Seat Capacity"
          className="border p-2 w-full"
          value={newCar.seatCapacity}
          onChange={(e) =>
            setNewCar({ ...newCar, seatCapacity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={newCar.price}
          onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Car
        </button>
      </form>

      {/* Car List */}
      <div className="space-y-3">
        {cars.map((c) => (
          <div
            key={c._id}
            className="p-4 bg-gray-100 rounded flex justify-between items-center"
          >
            <div>
              <p>
                <b>{c.carType}</b> - {c.engineType} - {c.seatCapacity} seats
              </p>
              <p>
                ₹{c.price} |{" "}
                {c.availability ? "✅ Available" : "❌ Not Available"}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => toggleAvailability(c._id, c.availability)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>
              <button
                onClick={() => handleDelete(c._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
