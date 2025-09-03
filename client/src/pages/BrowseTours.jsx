import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BrowseTours() {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
  });

  useEffect(() => {
    fetchTours();
  }, [page, filters]);

  const fetchTours = async () => {
    const res = await axios.get("http://localhost:5000/api/tours", {
      params: { ...filters, page },
    });
    setTours(res.data.results);
    setPages(res.data.pages);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse Tours</h1>

      {/* Filters */}
      <div className="bg-white shadow p-4 rounded mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="Adventure">Adventure</option>
          <option value="Honeymoon">Honeymoon</option>
          <option value="Family">Family</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <select
          className="border p-2 rounded col-span-2 md:col-span-1"
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

      {/* Tours List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour._id} className="border rounded-lg shadow p-4">
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{tour.title}</h3>
            <p>{tour.duration}</p>
            <p className="text-blue-600 font-bold">₹{tour.price}</p>
            <p className="text-sm">{tour.description.slice(0, 80)}...</p>
            <Link
              to={`/tours/${tour._id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              View More →
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
