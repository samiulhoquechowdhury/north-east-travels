// client/src/pages/BrowseTours.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  Star,
  Camera,
  Mountain,
  Trees,
  Waves,
  Clock,
  Search,
} from "lucide-react";

// Mock data (replace with API later)
const MOCK_TOURS = [
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

export default function BrowseTours() {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    type: "",
    maxPrice: "",
    sortBy: "",
  });

  const navigate = useNavigate();
  const PER_PAGE = 6;

  useEffect(() => {
    fetchTours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  const applyClientFilters = (items) => {
    let data = [...items];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.places?.some((place) => place.toLowerCase().includes(q)) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (filters.type) data = data.filter((t) => t.type === filters.type);

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice, 10);
      data = data.filter((t) => Number(t.price) <= max);
    }

    if (filters.sortBy === "priceLow") {
      data.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filters.sortBy === "priceHigh") {
      data.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (filters.sortBy === "rating") {
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === "duration") {
      data.sort((a, b) => a.duration.localeCompare(b.duration));
    }

    return data;
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      // TODO: replace with real API call later
      await new Promise((r) => setTimeout(r, 300));
      const filtered = applyClientFilters(MOCK_TOURS);
      const start = (page - 1) * PER_PAGE;
      setTours(filtered.slice(start, start + PER_PAGE));
      setPages(Math.max(1, Math.ceil(filtered.length / PER_PAGE)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalCount = useMemo(
    () => applyClientFilters(MOCK_TOURS).length,
    [filters]
  );

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "adventure":
        return <Mountain className="w-4 h-4" />;
      case "family":
        return <Users className="w-4 h-4" />;
      case "honeymoon":
        return <Trees className="w-4 h-4" />;
      default:
        return <Waves className="w-4 h-4" />;
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "",
      maxPrice: "",
      sortBy: "",
    });
    setPage(1);
  };

  const handleBook = (tour) => {
    const token = localStorage.getItem("token");
    const bookingPath = `/book/${tour._id}`;

    // store intention so after login we can continue
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-10 max-w-7xl mx-auto mt-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Discover Northeast India
            </h1>
            <p className="text-gray-600 text-lg">
              Explore breathtaking landscapes and rich cultures
            </p>
          </div>
          <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                Loading…
              </span>
            ) : (
              `${totalCount} tours available`
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 shadow-lg p-6 rounded-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours, places, or activities..."
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            <select
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
              placeholder="Max Price"
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />

            <select
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
            >
              <option value="">Sort By</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>

          {/* Active Filters & Clear */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: "{filters.search}"
                </span>
              )}
              {filters.type && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Type: {filters.type}
                </span>
              )}
              {filters.maxPrice && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  Max: ₹{filters.maxPrice}
                </span>
              )}
              {filters.sortBy && (
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  Sorted by:{" "}
                  {filters.sortBy === "priceLow"
                    ? "Price (Low to High)"
                    : filters.sortBy === "priceHigh"
                    ? "Price (High to Low)"
                    : filters.sortBy === "rating"
                    ? "Rating"
                    : "Duration"}
                </span>
              )}
            </div>

            {(filters.search ||
              filters.type ||
              filters.maxPrice ||
              filters.sortBy) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(PER_PAGE)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : tours && tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      tour.images?.[0] ||
                      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop"
                    }
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                    {getTypeIcon(tour.type)}
                    {tour.type}
                  </div>

                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-3 py-1 text-sm font-bold shadow-lg">
                    ₹{tour.price?.toLocaleString?.("en-IN") ?? tour.price}
                  </div>

                  {tour.rating && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{tour.rating}</span>
                      <span className="text-gray-500">({tour.reviews})</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      All Ages
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tour.description}
                  </p>

                  {tour.places && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Places to Visit
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {tour.places.slice(0, 3).map((place, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs transition-colors"
                          >
                            {place}
                          </span>
                        ))}
                        {tour.places.length > 3 && (
                          <span className="text-xs text-gray-500 px-2 py-1 font-medium">
                            +{tour.places.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {tour.highlights && (
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        Highlights
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.slice(0, 2).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs transition-colors"
                          >
                            {highlight}
                          </span>
                        ))}
                        {tour.highlights.length > 2 && (
                          <span className="text-xs text-blue-600 px-2 py-1 font-medium">
                            +{tour.highlights.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {/* inside BrowseTours.jsx, replace the View Details button */}
                    <button
                      onClick={() =>
                        navigate(`/tour/${tour._id}`, { state: { tour } })
                      }
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBook(tour)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-all text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No tours found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find more tours.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white border-gray-300 hover:border-gray-400 text-gray-700"
            >
              Previous
            </button>

            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  page === i + 1
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(pages, page + 1))}
              disabled={page === pages}
              className="px-4 py-2 rounded-lg border font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white border-gray-300 hover:border-gray-400 text-gray-700"
            >
              Next
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Why Choose Northeast India?
            </h2>
            <p className="text-gray-600">
              Experience the unexplored beauty of India's hidden gem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mountain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Untouched Nature</h3>
              <p className="text-sm text-gray-600">
                Pristine landscapes, crystal clear rivers, and breathtaking
                mountain views
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Rich Culture</h3>
              <p className="text-sm text-gray-600">
                Diverse tribal communities, ancient traditions, and warm
                hospitality
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Adventure</h3>
              <p className="text-sm text-gray-600">
                Trekking, river rafting, wildlife safaris, and unique
                experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
