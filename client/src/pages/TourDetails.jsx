import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { AuthContext } from "../context/AuthContext";
import BookingForm from "../components/BookingForm";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [rating, setRating] = useState({ avgRating: 0, totalReviews: 0 });

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
      <Helmet>
        <title>{tour.title} | Travel Portal</title>
        <meta name="description" content={tour.description.slice(0, 150)} />
        <meta name="keywords" content={`tour, ${tour.title}, ${tour.type}`} />
      </Helmet>

      {/* Tour Info */}
      <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
      <p className="text-xl text-blue-600 font-semibold mb-4">₹{tour.price}</p>

      {/* ⭐ Ratings */}
      <p className="text-yellow-600 mb-4">
        {rating.avgRating.toFixed(1)} ⭐ ({rating.totalReviews} reviews)
      </p>

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

      {/* Book Now */}
      {!showBooking ? (
        <button
          onClick={handleBookNow}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Book Now
        </button>
      ) : (
        <BookingForm
          tourId={tour._id}
          onSuccess={() => setShowBooking(false)}
        />
      )}

      {/* Reviews Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-2">Customer Reviews</h2>
      <ReviewForm tourId={tour._id} onAdded={() => {}} />
      <ReviewList tourId={tour._id} />
    </div>
  );
}
