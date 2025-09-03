import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function AdminTours() {
  const { user } = useContext(AuthContext);
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const res = await axios.get("http://localhost:5000/api/tours");
    setTours(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/tours", newTour, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchTours();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tours/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchTours();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tours</h2>
      {/* Add New Tour */}
      <form
        onSubmit={handleCreate}
        className="mb-6 space-y-3 bg-white shadow p-4 rounded"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={newTour.title}
          onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 w-full"
          value={newTour.description}
          onChange={(e) =>
            setNewTour({ ...newTour, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Duration"
          className="border p-2 w-full"
          value={newTour.duration}
          onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={newTour.price}
          onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Tour
        </button>
      </form>

      {/* List Tours */}
      <div className="space-y-3">
        {tours.map((t) => (
          <div
            key={t._id}
            className="p-4 bg-gray-100 rounded flex justify-between"
          >
            <div>
              <p>
                <b>{t.title}</b> - {t.duration}
              </p>
              <p>₹{t.price}</p>
            </div>
            <button
              onClick={() => handleDelete(t._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
