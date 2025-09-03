import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { AuthContext } from "../context/AuthContext";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTour = async () => {
      const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
      setTour(res.data);
    };
    fetchTour();
  }, [id]);

  if (!tour) return <p className="text-center mt-10">Loading...</p>;

  // Carousel settings
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
      navigate(`/tours/${id}/book`); // later we’ll add Booking Form
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Title + Price */}
      <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
      <p className="text-xl text-blue-600 font-semibold mb-4">₹{tour.price}</p>

      {/* Carousel */}
      <div className="mb-6">
        <Slider {...sliderSettings}>
          {tour.images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={tour.title}
                className="rounded-lg w-full h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Duration + Description */}
      <p className="text-gray-700 mb-4">
        <b>Duration:</b> {tour.duration}
      </p>
      <p className="text-gray-600 mb-6">{tour.description}</p>

      {/* Highlights */}
      <h2 className="text-2xl font-semibold mb-2">Highlights</h2>
      <ul className="list-disc pl-6 mb-6">
        {tour.highlights.map((h, idx) => (
          <li key={idx} className="text-gray-700">
            {h}
          </li>
        ))}
      </ul>

      {/* Itinerary */}
      <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{tour.itinerary}</p>

      {/* Terms & Conditions */}
      <h2 className="text-2xl font-semibold mb-2">Terms & Conditions</h2>
      <p className="text-gray-500 mb-6">
        Booking is subject to availability. Cancellation charges may apply.
        Please carry valid ID proof.
      </p>

      {/* Book Now */}
      <button
        onClick={handleBookNow}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Book Now
      </button>
    </div>
  );
}
