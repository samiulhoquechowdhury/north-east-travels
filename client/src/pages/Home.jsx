import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Testimonials from "../components/Testimonials";

export default function Home() {
  const [tours, setTours] = useState([]);
  const [cars, setCars] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchTours();
    fetchCars();
  }, []);

  const fetchTours = async () => {
    const res = await axios.get("http://localhost:5000/api/tours", {
      params: { search, minPrice, maxPrice, type },
    });
    setTours(res.data);
  };

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars");
    setCars(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tourRes = await axios.get("http://localhost:5000/api/tours");
      const carRes = await axios.get("http://localhost:5000/api/cars");
      setTours(tourRes.data);
      setCars(carRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <Helmet>
        <title>Travel Portal | Explore Tours & Car Rentals</title>
        <meta
          name="description"
          content="Book tours and car rentals easily with Travel Portal."
        />
        <meta
          name="keywords"
          content="tours, travel, cars, rentals, holiday packages"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-blue-500 text-white text-center p-12 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
        <p className="mt-4">Explore tours and car rentals with ease</p>
      </div>

      {/* Tour Filters */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter Tours</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="Adventure">Adventure</option>
            <option value="Honeymoon">Honeymoon</option>
            <option value="Family">Family</option>
          </select>
        </div>
        <button
          onClick={fetchTours}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Tours */}
      <h2 className="text-2xl font-bold mb-4">Featured Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tours.map((tour) => (
          <div key={tour._id} className="border rounded-lg shadow p-4">
            <LazyLoadImage
              src={tour.images[0]}
              alt={tour.title}
              effect="blur"
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

      {/* Car Filters */}
      <div className="bg-white shadow p-4 rounded mb-6 mt-10">
        <h2 className="text-xl font-semibold mb-2">Filter Cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Car Type"
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option value="">All Engines</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          <input
            type="number"
            placeholder="Seats"
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option value="">Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
          Apply Filters
        </button>
      </div>

      {/* Cars */}
      <h2 className="text-2xl font-bold mb-4">Available Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="border rounded-lg shadow p-4">
            <img
              src={car.images[0]}
              alt={car.carType}
              className="rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{car.carType}</h3>
            <p>
              {car.seatCapacity} Seater - {car.engineType}
            </p>
            <p className="text-blue-600 font-bold">₹{car.price}</p>
            <Link
              to={`/cars/${car._id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              View More →
            </Link>
          </div>
        ))}
      </div>

      {/* Testimonials */}

      <Testimonials />
    </div>
  );
}
