import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Home() {
  const [tours, setTours] = useState([]);
  const [cars, setCars] = useState([]);

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
    </div>
  );
}
