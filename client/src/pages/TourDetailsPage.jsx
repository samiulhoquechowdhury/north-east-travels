import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Camera,
  Heart,
  Share2,
  Calendar,
  Check,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Award,
  Shield,
  Zap,
  Mountain,
  Trees,
  Waves,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Eye,
  ThumbsUp,
  Quote,
  ChevronDown,
  ChevronUp,
  Grid,
  Maximize2,
  Navigation,
} from "lucide-react";

const TourDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tour = location.state?.tour;

  // Mock tour data if not passed via state
  const mockTour = {
    _id: "kaziranga-001",
    title: "Kaziranga National Park Safari",
    type: "Adventure",
    duration: "3 Days / 2 Nights",
    price: 12999,
    rating: 4.8,
    reviews: 124,
    description:
      "UNESCO World Heritage Site famous for one-horned rhinos, lush grasslands, and unforgettable jeep safaris.",
    places: [
      "Kaziranga National Park",
      "Kohora Range",
      "Bagori Range",
      "Agoratoli Range",
    ],
    highlights: [
      "One-horned Rhino Safari",
      "Bird Watching",
      "Elephant Rides",
      "Nature Photography",
    ],
    images: [
      "https://images.unsplash.com/photo-1675296098616-53e3d4a1dd57?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1470&auto=format&fit=crop",
    ],
  };

  const currentTour = tour || mockTour;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [expandedDay, setExpandedDay] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "itinerary", label: "Itinerary", icon: Navigation },
    { id: "inclusions", label: "What's Included", icon: Check },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  const itinerary = [
    {
      day: 1,
      title: "Arrival & Welcome Safari",
      location: "Kaziranga National Park",
      activities: [
        "Check-in at resort",
        "Welcome lunch",
        "Evening jeep safari",
        "Wildlife photography session",
      ],
      highlights: ["First rhino sightings", "Sunset over grasslands"],
      meals: ["Lunch", "Dinner"],
      accommodation: "Diphlu River Lodge",
    },
    {
      day: 2,
      title: "Full Day Wildlife Adventure",
      location: "Central & Western Range",
      activities: [
        "Early morning elephant safari",
        "Breakfast at resort",
        "Jeep safari to Western range",
        "Bird watching tour",
      ],
      highlights: [
        "Close rhino encounters",
        "Wild buffalo herds",
        "Exotic bird species",
      ],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "Diphlu River Lodge",
    },
    {
      day: 3,
      title: "Final Safari & Departure",
      location: "Eastern Range",
      activities: [
        "Final morning safari",
        "Checkout",
        "Visit to Kaziranga Museum",
        "Departure",
      ],
      highlights: ["Last wildlife photos", "Cultural insights"],
      meals: ["Breakfast", "Lunch"],
      accommodation: "Day use",
    },
  ];

  const inclusions = [
    "Accommodation in premium eco-lodges",
    "All meals as per itinerary",
    "Professional wildlife guide",
    "All safari permits and fees",
    "Transportation in AC vehicle",
    "Photography assistance",
    "Emergency medical support",
  ];

  const exclusions = [
    "Personal expenses",
    "Alcoholic beverages",
    "Travel insurance",
    "Tips and gratuities",
    "Camera fees (if any)",
    "Items not mentioned in inclusions",
  ];

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely incredible experience! Saw 15+ rhinos and the guide was extremely knowledgeable. The accommodation was luxurious and food was amazing.",
      images: [
        "https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=400",
      ],
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 5,
      date: "1 month ago",
      comment:
        "Perfect honeymoon trip! The elephant safari was a dream come true. Every detail was perfectly organized and the staff was so caring.",
      images: [],
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      name: "David Johnson",
      rating: 4,
      date: "6 weeks ago",
      comment:
        "Great wildlife experience. Saw rhinos up close and learned so much about conservation. Only minor issue was weather, but that's nature!",
      images: [
        "https://images.unsplash.com/photo-1675296098616-53e3d4a1dd57?q=80&w=400",
      ],
      helpful: 12,
      verified: true,
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentTour.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentTour.images.length - 1 : prev - 1
    );
  };

  const handleBook = () => {
    const token = localStorage.getItem("token");
    const bookingPath = `/book/${currentTour._id}`;

    sessionStorage.setItem(
      "intendedBooking",
      JSON.stringify({
        tourId: currentTour._id,
        guests: guestCount,
        date: selectedDate,
      })
    );

    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(bookingPath)}`);
      return;
    }
    navigate(bookingPath, {
      state: {
        tour: currentTour,
        guests: guestCount,
        date: selectedDate,
      },
    });
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 7; i < 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  if (!currentTour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tour not found
          </h2>
          <button
            onClick={() => navigate("/browse-tours")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                About This Tour
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {currentTour.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Places You'll Visit
                  </h4>
                  <div className="space-y-2">
                    {currentTour.places.map((place, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-gray-700">{place}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-green-600" />
                    Tour Highlights
                  </h4>
                  <div className="space-y-2">
                    {currentTour.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-4">Quick Facts</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">
                      {currentTour.duration}
                    </div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Mountain className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">
                      {currentTour.type}
                    </div>
                    <div className="text-sm text-gray-600">Tour Type</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">
                      {currentTour.rating}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">All Ages</div>
                    <div className="text-sm text-gray-600">Suitable for</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "itinerary":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Day-by-Day Itinerary
            </h3>
            {itinerary.map((day, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setExpandedDay(expandedDay === idx ? null : idx)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {day.day}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {day.title}
                        </h4>
                        <p className="text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {day.location}
                        </p>
                      </div>
                    </div>
                    {expandedDay === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedDay === idx && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Activities
                        </h5>
                        <ul className="space-y-2">
                          {day.activities.map((activity, actIdx) => (
                            <li key={actIdx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {activity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Highlights
                        </h5>
                        <ul className="space-y-2">
                          {day.highlights.map((highlight, hlIdx) => (
                            <li key={hlIdx} className="flex items-start gap-2">
                              <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Details
                        </h5>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-900">
                              Meals:{" "}
                            </span>
                            <span className="text-gray-700">
                              {day.meals.join(", ")}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">
                              Stay:{" "}
                            </span>
                            <span className="text-gray-700">
                              {day.accommodation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "inclusions":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <X className="w-6 h-6" />
                  What's Not Included
                </h3>
                <ul className="space-y-3">
                  {exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Important Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold text-blue-900">
                      Safety First
                    </div>
                    <div className="text-blue-800 text-sm">
                      All safety protocols followed
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold text-blue-900">
                      Certified Guides
                    </div>
                    <div className="text-blue-800 text-sm">
                      Expert local knowledge
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="font-semibold text-blue-900">
                      Instant Booking
                    </div>
                    <div className="text-blue-800 text-sm">
                      Immediate confirmation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold text-lg">{currentTour.rating}</span>
                <span className="text-gray-600">
                  ({currentTour.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Rating Breakdown</h4>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3 mb-2">
                      <span className="text-sm w-8">{rating} ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width:
                              rating === 5
                                ? "75%"
                                : rating === 4
                                ? "20%"
                                : "5%",
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {rating === 5 ? "93" : rating === 4 ? "25" : "6"}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Review Highlights</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Wildlife Experience</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Accommodation</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Guide Knowledge</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {(showAllReviews ? reviews : reviews.slice(0, 2)).map(
                (review) => (
                  <div
                    key={review.id}
                    className="bg-white border border-gray-200 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-gray-900">
                              {review.name}
                            </h5>
                            {review.verified && (
                              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                ✓ Verified
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.comment}
                    </p>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt="Review"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">
                          Helpful ({review.helpful})
                        </span>
                      </button>
                      <Quote className="w-5 h-5 text-gray-300" />
                    </div>
                  </div>
                )
              )}

              {reviews.length > 2 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                >
                  {showAllReviews
                    ? "Show Less Reviews"
                    : `Show All ${reviews.length} Reviews`}
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Gallery */}
      <div className="relative h-[60vh] md:h-[70vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentTour.images[currentImageIndex]}
            alt={currentTour.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Navigation Arrows */}
        {currentTour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full">
          {currentImageIndex + 1} / {currentTour.images.length}
        </div>

        {/* Gallery Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
        >
          <Grid className="w-5 h-5" />
          View Gallery
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Hero Content */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                <span className="font-medium">{currentTour.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{currentTour.rating}</span>
                <span className="text-white/80">
                  ({currentTour.reviews} reviews)
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {currentTour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{currentTour.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{currentTour.places[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>All Ages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                        selectedTab === tab.id
                          ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6 md:p-8">{renderTabContent()}</div>
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Pricing Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      ₹
                      {currentTour.price?.toLocaleString?.("en-IN") ??
                        currentTour.price}
                    </div>
                    <div className="text-blue-100">per person</div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="p-6 space-y-6">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Choose departure date</option>
                      {availableDates.slice(0, 10).map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Number of Guests
                    </label>
                    <div className="flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3">
                      <button
                        onClick={() =>
                          setGuestCount(Math.max(1, guestCount - 1))
                        }
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold">{guestCount} Guests</span>
                      <button
                        onClick={() => setGuestCount(guestCount + 1)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ₹
                        {currentTour.price?.toLocaleString?.("en-IN") ??
                          currentTour.price}{" "}
                        × {guestCount} guests
                      </span>
                      <span className="font-semibold">
                        ₹
                        {((currentTour.price || 0) * guestCount).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-semibold">
                        ₹
                        {Math.round(
                          (currentTour.price || 0) * guestCount * 0.05
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg text-blue-600">
                        ₹
                        {Math.round(
                          (currentTour.price || 0) * guestCount * 1.05
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleBook}
                      disabled={!selectedDate}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Book Now
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                          isWishlisted
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isWishlisted ? "fill-current" : ""
                          }`}
                        />
                        <span className="hidden sm:inline">Wishlist</span>
                      </button>

                      <button className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 py-3 px-4 rounded-lg font-medium transition-all">
                        <Share2 className="w-5 h-5" />
                        <span className="hidden sm:inline">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Need Help?
                    </h4>
                    <div className="space-y-2">
                      <a
                        href="tel:+919876543210"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>+91 98765 43210</span>
                      </a>
                      <a
                        href="mailto:support@example.com"
                        className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>support@example.com</span>
                      </a>
                      <button className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>Live Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Why Book With Us?
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Safe & Secure
                      </div>
                      <div className="text-sm text-gray-600">
                        SSL encrypted booking
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Best Price
                      </div>
                      <div className="text-sm text-gray-600">
                        Price match guarantee
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Instant Confirm
                      </div>
                      <div className="text-sm text-gray-600">
                        Immediate booking
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Tours */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Similar Adventures
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
              View All Tours
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock similar tours */}
            {[
              {
                title: "Meghalaya Living Root Bridges",
                price: 15999,
                rating: 4.9,
                reviews: 203,
                image:
                  "https://i.pinimg.com/564x/f4/db/5e/f4db5ea9aaebba1c8df8ed8d360e4721.jpg",
                duration: "4D/3N",
              },
              {
                title: "Tawang Monastery Trek",
                price: 18999,
                rating: 4.7,
                reviews: 67,
                image:
                  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=400",
                duration: "5D/4N",
              },
              {
                title: "Majuli Cultural Experience",
                price: 8999,
                rating: 4.6,
                reviews: 87,
                image:
                  "https://footloosedev.com/wp-content/uploads/2016/01/bamboo-cottage.jpg",
                duration: "2D/1N",
              },
            ].map((tour, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-sm">({tour.reviews})</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {tour.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{tour.price.toLocaleString("en-IN")}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox for Gallery */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={currentTour.images[currentImageIndex]}
              alt={currentTour.title}
              className="max-w-full max-h-full object-contain"
            />

            {currentTour.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {currentTour.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetailsPage;
