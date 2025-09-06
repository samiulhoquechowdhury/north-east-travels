import React, { useState, useEffect } from "react";
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Fuel,
  Settings,
  Star,
  Heart,
  Shield,
  Zap,
  ChevronDown,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  X,
} from "lucide-react";

const CarBookingPage = () => {
  const [selectedPickup, setSelectedPickup] = useState("");
  const [selectedDropoff, setSelectedDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Sample car data
  const cars = [
    {
      id: 1,
      name: "BMW X5",
      category: "luxury",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik01MCA5MEM1MCA4NSA1NSA4MCA2MCA4MEgyNDBDMjQ1IDgwIDI1MCA4NSAyNTAgOTBWMTQwQzI1MCA1NSAyNDUgMTUwIDI0MCAxNTBINjBDNTUgMTUwIDUwIDE0NSA1MDE0MFY5MFoiIGZpbGw9IiMxZTQwYWYiLz4KPGNpcmNsZSBjeD0iODAiIGN5PSIxNDAiIHI9IjE1IiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjIyMCIgY3k9IjE0MCIgcj0iMTUiIGZpbGw9IiMzNzQxNTEiLz4KPHN2Zz4=",
      price: 89,
      rating: 4.8,
      features: ["Auto", "AC", "5 Seats", "GPS"],
      fuel: "Petrol",
      transmission: "Automatic",
      passengers: 5,
      description: "Premium luxury SUV with advanced safety features",
    },
    {
      id: 2,
      name: "Tesla Model S",
      category: "electric",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik00MCA5MEM0MCA4NSA0NSA4MCA1MCA4MEgyNTBDMjU1IDgwIDI2MCA4NSAyNjAgOTBWMTMwQzI2MCAxMzUgMjU1IDE0MCAyNTAgMTQwSDUwQzQ1IDE0MCA0MCAxMzUgNDAgMTMwVjkwWiIgZmlsbD0iIzEwYjk4MSIvPgo8Y2lyY2xlIGN4PSI3NSIgY3k9IjE0NSIgcj0iMTIiIGZpbGw9IiMzNzQxNTEiLz4KPGNpcmNsZSBjeD0iMjI1IiBjeT0iMTQ1IiByPSIxMiIgZmlsbD0iIzM3NDE1MSIvPgo8L3N2Zz4=",
      price: 120,
      rating: 4.9,
      features: ["Auto", "Electric", "5 Seats", "Autopilot"],
      fuel: "Electric",
      transmission: "Automatic",
      passengers: 5,
      description: "Cutting-edge electric sedan with autopilot technology",
    },
    {
      id: 3,
      name: "Honda Civic",
      category: "economy",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik01MCA5NEM1MCA4OSA1NCA4NSA1OSA4NUgyNDFDMjQ2IDg1IDI1MCA4OSAyNTAgOTRWMTI2QzI1MCAxMzEgMjQ2IDEzNSAyNDEgMTM1SDU5QzU0IDEzNSA1MCAxMzEgNTAgMTI2Vjk0WiIgZmlsbD0iIzM5MzlmZiIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjE0MCIgcj0iMTAiIGZpbGw9IiMzNzQxNTEiLz4KPGNpcmNsZSBjeD0iMjIwIiBjeT0iMTQwIiByPSIxMCIgZmlsbD0iIzM3NDE1MSIvPgo8L3N2Zz4=",
      price: 45,
      rating: 4.6,
      features: ["Manual", "AC", "5 Seats", "Bluetooth"],
      fuel: "Petrol",
      transmission: "Manual",
      passengers: 5,
      description: "Reliable and fuel-efficient compact car",
    },
    {
      id: 4,
      name: "Audi Q7",
      category: "luxury",
      image:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik00NSA4OEM0NSA4MyA1MCA3OCA1NSA3OEgyNDVDMjUwIDc4IDI1NSA4MyAyNTUgODhWMTQyQzI1NSAxNDcgMjUwIDE1MiAyNDUgMTUySDU1QzUwIDE1MiA0NSAxNDcgNDUgMTQyVjg4WiIgZmlsbD0iIzM3MzgzYyIvPgo8Y2lyY2xlIGN4PSI4NSIgY3k9IjE0MiIgcj0iMTYiIGZpbGw9IiMzNzQxNTEiLz4KPGNpcmNsZSBjeD0iMjE1IiBjeT0iMTQyIiByPSIxNiIgZmlsbD0iIzM3NDE1MSIvPgo8L3N2Zz4=",
      price: 95,
      rating: 4.7,
      features: ["Auto", "AWD", "7 Seats", "Premium Sound"],
      fuel: "Petrol",
      transmission: "Automatic",
      passengers: 7,
      description: "Spacious luxury SUV with all-wheel drive",
    },
  ];

  const locations = [
    "Airport Terminal 1",
    "Airport Terminal 2",
    "Downtown Central",
    "Business District",
    "Hotel Zone",
    "Railway Station",
  ];

  const categories = [
    { id: "all", name: "All Cars", icon: Car },
    { id: "economy", name: "Economy", icon: Car },
    { id: "luxury", name: "Luxury", icon: Car },
    { id: "electric", name: "Electric", icon: Zap },
  ];

  const filteredCars =
    selectedCategory === "all"
      ? cars
      : cars.filter((car) => car.category === selectedCategory);

  const toggleFavorite = (carId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(carId)) {
      newFavorites.delete(carId);
    } else {
      newFavorites.add(carId);
    }
    setFavorites(newFavorites);
  };

  const handleBookCar = (car) => {
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setPickupDate(today.toISOString().split("T")[0]);
    setDropoffDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Premium Car Rentals
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Experience luxury and comfort with our premium fleet of vehicles
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              {/* Pickup Location */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Pickup Location
                </label>
                <select
                  value={selectedPickup}
                  onChange={(e) => setSelectedPickup(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                >
                  <option value="">Select pickup location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropoff Location */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Dropoff Location
                </label>
                <select
                  value={selectedDropoff}
                  onChange={(e) => setSelectedDropoff(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                >
                  <option value="">Select dropoff location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates and Times */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Pickup Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Dropoff Date
                </label>
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Cars
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex flex-wrap gap-4 mb-4 sm:mb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-md"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(car.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 capitalize">
                    {car.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {car.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">
                      {car.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{car.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {car.passengers} seats
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Fuel className="w-4 h-4" />
                    {car.fuel}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Settings className="w-4 h-4" />
                    {car.transmission}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    Insured
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature) => (
                    <span
                      key={feature}
                      className="bg-gray-100 px-2 py-1 rounded-lg text-xs font-medium text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${car.price}
                    </span>
                    <span className="text-gray-500 text-sm">/day</span>
                  </div>
                  <button
                    onClick={() => handleBookCar(car)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 group"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedCar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Confirm Booking
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-32 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedCar.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedCar.passengers} seats
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      {selectedCar.fuel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {selectedCar.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup
                  </label>
                  <p className="text-gray-800">
                    {selectedPickup || "Not selected"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {pickupDate} at {pickupTime}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dropoff
                  </label>
                  <p className="text-gray-800">
                    {selectedDropoff || "Not selected"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {dropoffDate} at {dropoffTime}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Booking Summary
                </h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Daily rate</span>
                  <span className="font-medium">${selectedCar.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">1 day</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-medium">$15</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ${selectedCar.price + 15}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarBookingPage;
