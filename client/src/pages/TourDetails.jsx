// client/src/pages/TourDetails.jsx
import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  IndianRupee,
  Star,
  MapPin,
  Camera,
  Users,
  ArrowLeft,
} from "lucide-react";

/**
 * NOTE: If you later replace mocks with real API calls,
 * swap the MOCK_TOURS lookup for an axios GET(`/api/tours/${id}`)
 * and show a loading state while fetching.
 */

// Minimal same mock copy (only id -> data needed). You can also import from a shared file.
const MOCK_TOURS = [
  /* copy exactly the SAME objects from your BrowseTours MOCK_TOURS */
  {
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
    ],
  },
  {
    _id: "majuli-001",
    title: "Majuli Island Cultural Retreat",
    type: "Family",
    duration: "2 Days / 1 Night",
    price: 8999,
    rating: 4.6,
    reviews: 87,
    description:
      "Explore the world's largest river island—satras, tribal culture, mask making, and serene Brahmaputra sunsets.",
    places: [
      "Majuli Island",
      "Auniati Satra",
      "Dakhinpat Satra",
      "Samaguri Satra",
    ],
    highlights: [
      "Satra Visits",
      "Mask Making",
      "Traditional Dance",
      "River Cruise",
    ],
    images: [
      "https://footloosedev.com/wp-content/uploads/2016/01/bamboo-cottage.jpg",
    ],
  },
  {
    _id: "guwahati-001",
    title: "Guwahati Temple & Riverfront",
    type: "Family",
    duration: "2 Days / 1 Night",
    price: 6999,
    rating: 4.4,
    reviews: 156,
    description:
      "Discover Kamakhya Temple, Umananda Island, and the scenic Brahmaputra riverfront with evening cruises.",
    places: [
      "Kamakhya Temple",
      "Umananda Island",
      "Brahmaputra Riverfront",
      "Assam State Museum",
    ],
    highlights: [
      "Temple Visits",
      "River Cruise",
      "Local Markets",
      "Cultural Shows",
    ],
    images: [
      "https://maldagoutambagchi.wordpress.com/wp-content/uploads/2015/01/012.jpg",
    ],
  },
  {
    _id: "meghalaya-001",
    title: "Meghalaya: Shillong • Cherrapunji • Dawki",
    type: "Adventure",
    duration: "4 Days / 3 Nights",
    price: 15999,
    rating: 4.9,
    reviews: 203,
    description:
      "Living root bridges, misty waterfalls, crystal-clear Umngot River, and the cleanest village Mawlynnong.",
    places: [
      "Shillong",
      "Cherrapunji",
      "Dawki",
      "Mawlynnong",
      "Double Decker Root Bridge",
    ],
    highlights: [
      "Root Bridge Trek",
      "Umngot River Boating",
      "Nohkalikai Falls",
      "Clean Village Tour",
    ],
    images: [
      "https://i.pinimg.com/564x/f4/db/5e/f4db5ea9aaebba1c8df8ed8d360e4721.jpg",
    ],
  },
  {
    _id: "shillong-001",
    title: "Shillong City & Canyons",
    type: "Honeymoon",
    duration: "3 Days / 2 Nights",
    price: 9999,
    rating: 4.5,
    reviews: 98,
    description:
      "Scotland of the East—cafés, music, canyons, and colonial charm mixed with Khasi culture.",
    places: ["Shillong Peak", "Ward's Lake", "Elephant Falls", "Police Bazar"],
    highlights: ["Scenic Viewpoints", "Local Cafes", "Music Scene", "Shopping"],
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
    ],
  },
  {
    _id: "tawang-001",
    title: "Tawang Monastery & High Passes",
    type: "Adventure",
    duration: "5 Days / 4 Nights",
    price: 18999,
    rating: 4.7,
    reviews: 67,
    description:
      "Dramatic mountain routes, Sela Pass, luminous monasteries, and the soul-stirring landscapes of Arunachal.",
    places: ["Tawang Monastery", "Sela Pass", "Madhuri Lake", "Jaswant Garh"],
    highlights: [
      "Monastery Visit",
      "High Altitude Lakes",
      "Mountain Photography",
      "Buddhist Culture",
    ],
    images: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1470&auto=format&fit=crop",
    ],
  },
  {
    _id: "z1",
    title: "Kaziranga & Majuli Combo",
    type: "Family",
    duration: "5 Days / 4 Nights",
    price: 21999,
    rating: 4.6,
    reviews: 89,
    description:
      "Wildlife + culture combo—rhinos in Kaziranga and riverside life on Majuli's satras.",
    places: ["Kaziranga National Park", "Majuli Island", "Jorhat", "Sibsagar"],
    highlights: [
      "Wildlife Safari",
      "Cultural Experience",
      "River Activities",
      "Heritage Sites",
    ],
    images: [
      "https://images.unsplash.com/photo-1549888834-3ec93abae044?q=80&w=1470&auto=format&fit=crop",
    ],
  },
  {
    _id: "z2",
    title: "Guwahati • Shillong Explorer",
    type: "Family",
    duration: "4 Days / 3 Nights",
    price: 13999,
    rating: 4.3,
    reviews: 142,
    description:
      "Perfect first-time Northeast trip—temples, cafés, canyons, and those evergreen Khasi hills.",
    places: ["Guwahati", "Shillong", "Cherrapunji", "Mawphlang"],
    highlights: ["Temple Tours", "Hill Station", "Waterfalls", "Local Cuisine"],
    images: [
      "https://images.unsplash.com/photo-1513875528452-39400945934d?q=80&w=1470&auto=format&fit=crop",
    ],
  },
  {
    _id: "z3",
    title: "Dawki Kayak & Camp",
    type: "Adventure",
    duration: "2 Days / 1 Night",
    price: 7999,
    rating: 4.8,
    reviews: 76,
    description:
      "Paddle on glassy waters, camp under a thousand stars, and wake up to emerald morning light.",
    places: ["Dawki", "Umngot River", "Shnongpdeng", "Mawlynnong"],
    highlights: [
      "River Kayaking",
      "Camping",
      "Crystal Clear Waters",
      "Adventure Sports",
    ],
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop",
    ],
  },
];

export default function TourDetails() {
  const { tourId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const routeTour = location.state?.tour;
  const tour = useMemo(
    () => routeTour || MOCK_TOURS.find((t) => t._id === tourId) || null,
    [routeTour, tourId]
  );

  const handleBook = (tour) => {
    const token = localStorage.getItem("token");
    const bookingPath = `/book/${tour._id}`;
    sessionStorage.setItem(
      "intendedBooking",
      JSON.stringify({ tourId: tour._id })
    );
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(bookingPath)}`);
      return;
    }
    navigate(bookingPath, { state: { tour } });
  };

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-gray-600">Tour not found.</p>
          <button
            onClick={() => navigate("/browse")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {tour.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {tour.type} • {tour.duration}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={
                  tour.images?.[0] ||
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop"
                }
                alt={tour.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Places to visit
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {tour.places.map((p, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 text-sm text-gray-500">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tour.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 px-3 py-1 rounded-md text-sm text-blue-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking card */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" />{" "}
                    {tour.price?.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Rating</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tour.rating}</span>
                    <span className="text-gray-500 text-sm">
                      ({tour.reviews})
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Select dates & travelers on the booking page. Booking will be
                  confirmed by the admin within 24 hours.
                </p>
                <button
                  onClick={() => handleBook(tour)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Quick info
              </h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{tour.duration}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>All Ages</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span>{tour.rating} rating</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
