import { useState, useEffect } from "react";

// Mock Link component for demo - replace with your actual react-router-dom Link
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const destinations = [
    {
      id: "kaziranga",
      name: "Kaziranga",
      tagline: "Where legends still roam",
      description:
        "Home to the world's last great rhinos. Every safari here whispers ancient stories of survival and majesty.",
      image:
        "https://images.unsplash.com/photo-1675296098616-53e3d4a1dd57?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  ];

  return (
    <section className="bg-white">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 py-20">
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

          {/* Simple Stats */}
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

        {/* Elegant Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className={`group bg-white border border-gray-100 hover:border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Clean Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>

                {/* Minimalist Price Tag */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-900 rounded-lg px-3 py-1 shadow-sm">
                  <span className="text-sm font-semibold">
                    {destination.price}
                  </span>
                </div>

                {/* Experience Type */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-gray-700 rounded-lg px-3 py-1 shadow-sm">
                  <span className="text-xs font-medium uppercase tracking-wide">
                    {destination.experience}
                  </span>
                </div>
              </div>

              {/* Refined Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {destination.duration}
                  </div>
                </div>

                <p className="text-gray-800 font-medium text-sm mb-4 italic">
                  {destination.tagline}
                </p>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {destination.description}
                </p>

                <Link
                  to={`/tours/${destination.id}`}
                  className="group/btn w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 text-sm uppercase tracking-wide"
                >
                  <span>Explore Journey</span>
                  <svg
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
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
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sophisticated CTA */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Ready to write your
              <span className="font-bold italic"> next chapter</span>?
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Every great story begins with a single step
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/browse/tours"
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
            </Link>

            <div className="flex items-center space-x-3 text-gray-500">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <span className="text-sm">Expert-curated experiences</span>
              </div>
            </div>
          </div>

          {/* Trust Elements */}
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
