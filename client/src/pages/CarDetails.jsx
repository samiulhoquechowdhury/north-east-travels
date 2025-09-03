import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { AuthContext } from "../context/AuthContext";
import BookingForm from "../components/BookingForm";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
      setCar(res.data);
    };
    fetchCar();
  }, [id]);

  if (!car) return <p className="text-center mt-10">Loading...</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleBookNow = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowBooking(true);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Car Info */}
      <h1 className="text-3xl font-bold mb-2">{car.carType}</h1>
      <p className="text-xl text-blue-600 font-semibold mb-4">₹{car.price}</p>

      {/* Carousel */}
      <div className="mb-6">
        <Slider {...sliderSettings}>
          {car.images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={car.carType}
                className="rounded-lg w-full h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Specs */}
      <p className="text-gray-700 mb-2">
        <b>Engine:</b> {car.engineType}
      </p>
      <p className="text-gray-700 mb-2">
        <b>Seats:</b> {car.seatCapacity}
      </p>
      <p className="text-gray-700 mb-2">
        <b>Availability:</b>{" "}
        {car.availability ? (
          <span className="text-green-600">Available</span>
        ) : (
          <span className="text-red-600">Not Available</span>
        )}
      </p>

      {/* Book Now */}
      {!showBooking ? (
        <button
          onClick={handleBookNow}
          disabled={!car.availability}
          className={`px-6 py-2 rounded-lg text-white ${
            car.availability
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Book Now
        </button>
      ) : (
        <BookingForm carId={car._id} onSuccess={() => setShowBooking(false)} />
      )}
    </div>
  );
}
