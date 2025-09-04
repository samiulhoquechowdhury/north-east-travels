import { useState, useEffect } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const destinations = [
    {
      id: "kaziranga",
      name: "Kaziranga",
      tagline: "Where legends still roam",
      description:
        "Home to the world's last great rhinos. Every safari here whispers ancient stories of survival and majesty.",
      image:
        "https://images.unsplash.com/photo-1675296098616-53e3d4a1dd57?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
      price: "₹12,999",
      duration: "3 Days",
      experience: "Wildlife Safari",
    },
    {
      id: "majuli",
      name: "Majuli",
      tagline: "An island lost in time",
      description:
        "The world's largest river island where monks chant at dawn and tradition flows like the Brahmaputra itself.",
      image:
        "https://footloosedev.com/wp-content/uploads/2016/01/bamboo-cottage.jpg",
      price: "₹8,999",
      duration: "2 Days",
      experience: "Cultural Immersion",
    },
    {
      id: "guwahati",
      name: "Guwahati",
      tagline: "The sacred confluence",
      description:
        "Where devotion meets the Brahmaputra. Ancient temples guard modern dreams in India's mystical gateway.",
      image:
        "https://maldagoutambagchi.wordpress.com/wp-content/uploads/2015/01/012.jpg",
      price: "₹6,999",
      duration: "2 Days",
      experience: "Spiritual Journey",
    },
    {
      id: "meghalaya",
      name: "Meghalaya",
      tagline: "Nature's living architecture",
      description:
        "Where roots weave bridges and clouds kiss the earth. Every path leads to wonder in the abode of clouds.",
      image:
        "https://i.pinimg.com/564x/f4/db/5e/f4db5ea9aaebba1c8df8ed8d360e4721.jpg",
      price: "₹15,999",
      duration: "4 Days",
      experience: "Adventure Trek",
    },
    {
      id: "shillong",
      name: "Shillong",
      tagline: "Scotland of the East",
      description:
        "Where music fills the mountain air and colonial charm meets tribal heritage in perfect harmony.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
      price: "₹9,999",
      duration: "3 Days",
      experience: "Cultural Heritage",
    },
    {
      id: "tawang",
      name: "Tawang",
      tagline: "Land of the dawn-lit mountains",
      description:
        "High-altitude serenity where Buddhist monasteries touch the sky and prayer flags dance with the wind.",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1470&auto=format&fit=crop",
      price: "₹18,999",
      duration: "5 Days",
      experience: "Mountain Trek",
    },
  ];

  // Responsive cards-per-view: xl=3, lg=2, mobile=1
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

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setPageIndex((p) => (p + 1) % totalPages);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages, isTransitioning]);

  const nextPage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setPageIndex((p) => (p + 1) % totalPages);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevPage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setPageIndex((p) => (p - 1 + totalPages) % totalPages);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPage = (i) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setPageIndex(Math.min(Math.max(i, 0), totalPages - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPage();
    } else if (isRightSwipe) {
      prevPage();
    }
  };

  const toggleFavorite = (destinationId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(destinationId)) {
        newFavorites.delete(destinationId);
      } else {
        newFavorites.add(destinationId);
      }
      return newFavorites;
    });
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div
          className={`text-center mb-20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2 mb-8 border border-gray-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-600 text-sm font-medium tracking-wide">
              Curated Experiences • Northeast India
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            Journey
            <br />
            <span className="font-bold italic">Beyond</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Discover India's last untold stories. Where every destination
            <br />
            <span className="text-gray-800 font-medium">
              becomes a chapter in your adventure
            </span>
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-12 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Destinations
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.9</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Experience Rating
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                Travelers
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative mb-16 p-7">
          {/* Enhanced Left Button */}
          <button
            aria-label="Previous destinations"
            onClick={prevPage}
            disabled={isTransitioning}
            className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center transition-all duration-300 hover:scale-105"
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

          {/* Enhanced Right Button */}
          <button
            aria-label="Next destinations"
            onClick={nextPage}
            disabled={isTransitioning}
            className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center transition-all duration-300 hover:scale-105"
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

          {/* Enhanced Track with Touch Support */}
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${pageIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, page) => {
                const start = page * cardsPerView;
                const pageItems = destinations.slice(
                  start,
                  start + cardsPerView
                );
                return (
                  <div
                    key={page}
                    className="shrink-0 w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
                  >
                    {pageItems.map((destination, index) => (
                      <div
                        key={destination.id}
                        className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 flex flex-col ${
                          isVisible ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {/* Enhanced Image with Better Overlay */}
                        <div className="relative h-60 overflow-hidden">
                          <img
                            src={destination.image}
                            alt={`${destination.name} - ${destination.tagline}`}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading={page === pageIndex ? "eager" : "lazy"}
                          />

                          {/* Enhanced Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>

                          {/* Enhanced Price Badge */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 rounded-xl px-3 py-2 shadow-lg border border-white/20">
                            <span className="text-sm font-bold">
                              {destination.price}
                            </span>
                          </div>

                          {/* Enhanced Experience Badge */}
                          <div className="absolute bottom-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white rounded-xl px-3 py-2 shadow-lg">
                            <span className="text-xs font-semibold uppercase tracking-wider">
                              {destination.experience}
                            </span>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm text-white rounded-xl px-3 py-1 shadow-lg">
                            <div className="flex items-center text-xs font-medium">
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {destination.duration}
                            </div>
                          </div>

                          {/* Heart Icon for Favorites */}
                          <button
                            onClick={() => toggleFavorite(destination.id)}
                            className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group/heart"
                          >
                            <svg
                              className={`w-5 h-5 transition-colors ${
                                favorites.has(destination.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-600 group-hover/heart:text-red-500"
                              }`}
                              fill={
                                favorites.has(destination.id)
                                  ? "currentColor"
                                  : "none"
                              }
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Enhanced Content Area */}
                        <div className="p-8 flex flex-col h-full">
                          <div className="mb-4">
                            <h3 className="text-2xl font-bold text-gray-900  transition-colors duration-300 mb-2">
                              {destination.name}
                            </h3>
                            <p className="text-gray-600 font-semibold text-sm mb-3 italic">
                              {destination.tagline}
                            </p>
                          </div>

                          <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">
                            {destination.description}
                          </p>

                          {/* Enhanced Button */}
                          <button
                            onClick={() =>
                              window.open(`/tours/${destination.id}`, "_self")
                            }
                            className="group/btn relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                          >
                            <span className="relative z-10">
                              Explore Journey
                            </span>
                            <svg
                              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Progress Indicators */}
          <div className="mt-8 flex justify-center items-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goToPage(i)}
                disabled={isTransitioning}
                className={`h-3 rounded-full transition-all duration-300 hover:scale-110 disabled:cursor-not-allowed ${
                  pageIndex === i
                    ? "w-8 bg-emerald-500 shadow-lg"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Mobile Swipe Indicator */}
          <div className="lg:hidden mt-4 flex justify-center">
            <div className="flex items-center text-gray-400 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span>Swipe to explore</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Ready to write your{" "}
              <span className="font-bold italic">next chapter</span>?
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Every great story begins with a single step
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => window.open("/browse/tours", "_self")}
              className="group bg-gray-900 text-white font-medium py-4 px-8 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>View All Destinations</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          {/* Trust */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex justify-center items-center space-x-12 text-gray-400">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Sustainable Tourism</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">24/7 Local Support</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">Authentic Experiences</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
