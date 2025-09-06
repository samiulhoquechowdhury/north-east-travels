// client/src/components/Hero.jsx
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, MapPin, Camera, Clock, ArrowRight } from "lucide-react";

/**
 * Rich Hero carousel — cards styled to match BrowseTours look & feel.
 * - View Details -> navigate('/tour/:id', { state: { tour } })
 * - Book Now -> same login guard flow as BrowseTours (stores intendedBooking in sessionStorage)
 */

export default function Hero() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const destinations = [
    {
      id: "kaziranga",
      name: "Kaziranga National Park Safari",
      shortId: "kaziranga-001",
      tagline: "Where legends still roam",
      description:
        "UNESCO World Heritage Site famous for one-horned rhinos, lush grasslands, and unforgettable jeep safaris.",
      image:
        "https://images.unsplash.com/photo-1675296098616-53e3d4a1dd57?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
      price: 12999,
      duration: "3 Days / 2 Nights",
      experience: "Wildlife / Adventure",
      type: "Adventure",
      rating: 4.8,
      reviews: 124,
      places: ["Kaziranga National Park", "Kohora Range", "Bagori Range"],
      highlights: ["Rhino Safari", "Bird Watching", "Nature Photography"],
    },
    {
      id: "majuli",
      name: "Majuli Island Cultural Retreat",
      shortId: "majuli-001",
      tagline: "An island lost in time",
      description:
        "Explore satras, mask making and riverside sunsets on the world's largest river island.",
      image:
        "https://footloosedev.com/wp-content/uploads/2016/01/bamboo-cottage.jpg",
      price: 8999,
      duration: "2 Days / 1 Night",
      experience: "Culture / Family",
      type: "Family",
      rating: 4.6,
      reviews: 87,
      places: ["Majuli Island", "Auniati Satra", "Samaguri Satra"],
      highlights: ["Satra Visits", "Mask Making", "River Cruise"],
    },
    {
      id: "guwahati",
      name: "Guwahati Temple & Riverfront",
      shortId: "guwahati-001",
      tagline: "The sacred confluence",
      description:
        "Kamakhya Temple, island shrines and serene Brahmaputra cruises — a gentle spiritual escape.",
      image:
        "https://maldagoutambagchi.wordpress.com/wp-content/uploads/2015/01/012.jpg",
      price: 6999,
      duration: "2 Days / 1 Night",
      experience: "Spiritual / Family",
      type: "Family",
      rating: 4.4,
      reviews: 156,
      places: ["Kamakhya Temple", "Umananda Island", "Brahmaputra Riverfront"],
      highlights: ["Temple Visits", "River Cruise", "Local Markets"],
    },
    {
      id: "meghalaya",
      name: "Meghalaya: Shillong • Cherrapunji • Dawki",
      shortId: "meghalaya-001",
      tagline: "Nature's living architecture",
      description:
        "Misty waterfalls, root bridges and limestone caves — the perfect blend of wonder and calm.",
      image:
        "https://i.pinimg.com/564x/f4/db/5e/f4db5ea9aaebba1c8df8ed8d360e4721.jpg",
      price: 15999,
      duration: "4 Days / 3 Nights",
      experience: "Trekking / Adventure",
      type: "Adventure",
      rating: 4.9,
      reviews: 203,
      places: ["Shillong", "Cherrapunji", "Dawki", "Mawlynnong"],
      highlights: ["Root Bridge Trek", "Waterfalls", "Boating"],
    },
    {
      id: "shillong",
      name: "Shillong City & Canyons",
      shortId: "shillong-001",
      tagline: "Scotland of the East",
      description:
        "Cafés, music, and rolling hills — a laid-back city break with a soulful soundtrack.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
      price: 9999,
      duration: "3 Days / 2 Nights",
      experience: "Culture / Honeymoon",
      type: "Honeymoon",
      rating: 4.5,
      reviews: 98,
      places: ["Shillong Peak", "Ward's Lake", "Elephant Falls"],
      highlights: ["Scenic Viewpoints", "Music Scene"],
    },
    {
      id: "tawang",
      name: "Tawang Monastery & High Passes",
      shortId: "tawang-001",
      tagline: "Land of the dawn-lit mountains",
      description:
        "Monasteries, high passes and luminous lakes — a soulful high-altitude escape.",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1470&auto=format&fit=crop",
      price: 18999,
      duration: "5 Days / 4 Nights",
      experience: "High-altitude / Adventure",
      type: "Adventure",
      rating: 4.7,
      reviews: 67,
      places: ["Tawang Monastery", "Sela Pass", "Madhuri Lake"],
      highlights: ["Monastery Visit", "Photography", "High Passes"],
    },
  ];

  // cards per view responsive
  const getCardsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 3;
      if (window.innerWidth >= 1024) return 2;
      return 1;
    }
    return 3;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const [pageIndex, setPageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(destinations.length / cardsPerView));

  useEffect(() => {
    setPageIndex((i) => Math.min(i, totalPages - 1));
  }, [cardsPerView, totalPages]);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) setPageIndex((p) => (p + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages, isTransitioning]);

  const nextPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPageIndex((p) => (p + 1) % totalPages);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPageIndex((p) => (p - 1 + totalPages) % totalPages);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPage = (i) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setPageIndex(Math.min(Math.max(i, 0), totalPages - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextPage();
    else if (distance < -50) prevPage();
  };

  const toggleFavorite = (id) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // build a "tour" object compatible with TourDetails & BookingForm
  const buildTourFromDestination = (d) => ({
    _id: d.shortId || d.id,
    title: d.name,
    type: d.type || (d.experience?.includes("Family") ? "Family" : "Adventure"),
    duration: d.duration,
    price: d.price,
    rating: d.rating,
    reviews: d.reviews,
    description: d.description,
    places: d.places || [d.name],
    highlights: d.highlights || [d.experience],
    images: [d.image],
  });

  const handleExploreJourney = (destination) => {
    const tour = buildTourFromDestination(destination);
    // navigate to detail page with route state
    navigate(`/tour/${destination.id}`, { state: { tour } });
  };

  const handleBook = (destination) => {
    const tour = buildTourFromDestination(destination);
    const bookingPath = `/book/${tour._id}`;
    sessionStorage.setItem(
      "intendedBooking",
      JSON.stringify({ tourId: tour._id })
    );

    const token = localStorage.getItem("token");
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent(bookingPath)}`);
      return;
    }
    navigate(bookingPath, { state: { tour } });
  };

  // UI helpers
  const startIndex = pageIndex * cardsPerView;
  const pages = Array.from({ length: totalPages });

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div
          className={`text-center mb-12 transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2 mb-6 border border-gray-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse" />
            <span className="text-gray-600 text-sm font-medium tracking-wide">
              Curated Experiences • Northeast India
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-3 leading-tight">
            Journey <br />
            <span className="font-bold italic">Beyond</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Discover India's hidden corners — tailored itineraries, mindful
            travel and unforgettable moments.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-8">
          {/* Prev / Next (desktop) */}
          <button
            aria-label="Previous"
            onClick={prevPage}
            disabled={isTransitioning}
            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/95 border border-gray-200  items-center justify-center transition-transform hover:scale-105 disabled:opacity-50"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            aria-label="Next"
            onClick={nextPage}
            disabled={isTransitioning}
            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/95 border border-gray-200 items-center justify-center transition-transform hover:scale-105 disabled:opacity-50"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Track */}
          <div
            className="overflow-hidden rounded-2xl p-3"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {pages.map((_, page) => {
                const start = page * cardsPerView;
                const pageItems = destinations.slice(
                  start,
                  start + cardsPerView
                );
                return (
                  <div
                    key={page}
                    className="shrink-0 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4"
                  >
                    {pageItems.map((d, i) => {
                      const tour = buildTourFromDestination(d);
                      return (
                        <article
                          key={d.id}
                          className={`group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow hover:shadow-lg transform transition-all duration-400 flex flex-col ${
                            isVisible ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ transitionDelay: `${i * 80}ms` }}
                        >
                          {/* Image */}
                          <div className="relative h-56 sm:h-64 md:h-48 overflow-hidden">
                            <img
                              src={d.image}
                              alt={`${d.name} - ${d.tagline}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Type badge */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                              <span className="uppercase text-xs text-gray-700">
                                {d.type}
                              </span>
                            </div>

                            {/* Price badge */}
                            <div className="absolute top-4 right-4 bg-white text-black rounded-lg px-3 py-1 text-sm font-bold shadow">
                              ₹{(d.price || 0).toLocaleString("en-IN")}
                            </div>

                            {/* Rating */}
                            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs flex items-center gap-2">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span className="font-medium">{d.rating}</span>
                              <span className="text-gray-500">
                                ({d.reviews})
                              </span>
                            </div>

                            {/* Favorite */}
                            <button
                              aria-label={
                                favorites.has(d.id)
                                  ? "Remove favorite"
                                  : "Add favorite"
                              }
                              onClick={() => toggleFavorite(d.id)}
                              className="absolute bottom-4 right-4 p-2 bg-white/95 rounded-full shadow hover:scale-105 transition-transform"
                            >
                              <svg
                                className={`w-5 h-5 ${
                                  favorites.has(d.id)
                                    ? "text-red-500 fill-red-500"
                                    : "text-gray-600"
                                }`}
                                viewBox="0 0 24 24"
                                fill={
                                  favorites.has(d.id) ? "currentColor" : "none"
                                }
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col h-full">
                            <div className="mb-3">
                              <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                                {d.name}
                              </h3>
                              <p className="text-sm text-gray-500 italic mb-2">
                                {d.tagline}
                              </p>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                              {d.description}
                            </p>

                            <div className="mb-4">
                              <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>{d.duration}</span>
                                <span className="mx-2">•</span>
                                <Users className="w-4 h-4 text-gray-500" />
                                <span>All Ages</span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {d.places.slice(0, 3).map((p, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs"
                                  >
                                    {p}
                                  </span>
                                ))}
                                {d.places.length > 3 && (
                                  <span className="text-xs text-gray-500 px-2 py-1">
                                    +{d.places.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-4">
                              <button
                                onClick={() =>
                                  navigate(`/tour/${d.id}`, { state: { tour } })
                                }
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors text-sm"
                              >
                                View Details
                              </button>

                              <button
                                onClick={() => handleBook(d)}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-transform text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="mt-6 flex justify-center items-center gap-3">
            {pages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  pageIndex === i
                    ? "w-8 bg-emerald-500 shadow-lg"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <div className="lg:hidden mt-4 flex justify-center text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <span>Swipe to explore</span>
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">
            Ready to write your{" "}
            <span className="font-bold italic">next chapter</span>?
          </h3>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => navigate("/browse/tours")}
              className="inline-flex items-center gap-3 bg-gray-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow"
            >
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
