import React, { useState, useEffect } from "react";
import {
  Star,
  Clock,
  MapPin,
  Users,
  Gift,
  Zap,
  Heart,
  Crown,
  Sparkles,
  Calendar,
  ArrowRight,
  Timer,
  Camera,
  Mountain,
} from "lucide-react";

const OffersPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 34,
    seconds: 22,
  });

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const exclusiveOffers = [
    {
      id: 1,
      badge: "LIMITED TIME",
      title: "Mega Northeast Explorer",
      subtitle: "7 Destinations • 12 Days",
      originalPrice: 45999,
      offerPrice: 28999,
      discount: 37,
      description:
        "Complete Northeast circuit covering all major destinations with luxury accommodations",
      features: [
        "Private Vehicle",
        "5-Star Hotels",
        "All Meals",
        "Local Guide",
        "Photography Tour",
      ],
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-purple-600 via-pink-600 to-red-500",
      type: "Premium",
      validTill: "Dec 31, 2024",
      popular: true,
    },
    {
      id: 2,
      badge: "FLASH SALE",
      title: "Tawang Winter Special",
      subtitle: "Monastery & Snow Views • 6 Days",
      originalPrice: 24999,
      offerPrice: 16999,
      discount: 32,
      description:
        "Experience the spiritual beauty of Tawang with snow-capped mountains and ancient monasteries",
      features: [
        "Monastery Tours",
        "High Altitude Lakes",
        "Cultural Shows",
        "Warm Clothing",
        "Hot Meals",
      ],
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      type: "Adventure",
      validTill: "Jan 15, 2025",
    },
    {
      id: 3,
      badge: "COUPLE SPECIAL",
      title: "Romantic Shillong Escape",
      subtitle: "Hills & Lakes • 4 Days",
      originalPrice: 18999,
      offerPrice: 12999,
      discount: 32,
      description:
        "Perfect honeymoon package with scenic viewpoints, cozy cafes, and romantic experiences",
      features: [
        "Couple Activities",
        "Scenic Drives",
        "Candlelight Dinner",
        "Photo Session",
        "Lake Boating",
      ],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-rose-500 via-pink-500 to-red-400",
      type: "Honeymoon",
      validTill: "Feb 14, 2025",
    },
    {
      id: 4,
      badge: "GROUP DEAL",
      title: "Kaziranga Safari Adventure",
      subtitle: "Wildlife & Nature • 3 Days",
      originalPrice: 15999,
      offerPrice: 9999,
      discount: 38,
      description:
        "Ultimate wildlife experience with guaranteed rhino sightings and jungle adventures",
      features: [
        "Jeep Safari",
        "Elephant Rides",
        "Bird Watching",
        "Nature Walk",
        "Wildlife Photography",
      ],
      image:
        "https://images.unsplash.com/photo-1675296098616-53e3d4a1dd57?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      type: "Wildlife",
      validTill: "Mar 31, 2025",
    },
  ];

  const quickDeals = [
    {
      title: "Dawki Crystal Waters",
      price: 7999,
      originalPrice: 11999,
      discount: 33,
      duration: "2D/1N",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop",
    },
    {
      title: "Majuli Cultural Tour",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      duration: "2D/1N",
      image:
        "https://footloosedev.com/wp-content/uploads/2016/01/bamboo-cottage.jpg",
    },
    {
      title: "Guwahati Temple Circuit",
      price: 5999,
      originalPrice: 8999,
      discount: 33,
      duration: "2D/1N",
      image:
        "https://maldagoutambagchi.wordpress.com/wp-content/uploads/2015/01/012.jpg",
    },
  ];

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Packages",
      desc: "Curated experiences not available elsewhere",
    },
    {
      icon: Crown,
      title: "Premium Service",
      desc: "5-star treatment throughout your journey",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      desc: "Secure your spot in just 60 seconds",
    },
    {
      icon: Heart,
      title: "Memorable Moments",
      desc: "Create lifelong memories with loved ones",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-white/90 font-medium">
              Exclusive Limited-Time Offers
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            MEGA
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              OFFERS
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock incredible savings on Northeast India's most breathtaking
            adventures.
            <span className="block mt-2 text-yellow-400 font-semibold">
              Limited time only!
            </span>
          </p>

          {/* Countdown Timer */}
          <div className="inline-flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 text-red-400">
              <Timer className="w-6 h-6 animate-pulse" />
              <span className="font-bold text-lg">Offers End In:</span>
            </div>
            <div className="flex gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg px-3 py-2 min-w-[60px] shadow-xl">
                    <div className="text-2xl font-bold">
                      {value.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-white/60 text-xs mt-1 uppercase tracking-wider">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-16">
          {exclusiveOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:border-white/30 ${
                offer.popular ? "ring-2 ring-yellow-400/50" : ""
              }`}
              onMouseEnter={() => setHoveredCard(offer.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {offer.popular && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full shadow-lg transform rotate-12">
                    <div className="flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      <span className="font-bold text-sm">MOST POPULAR</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Offer Badge */}
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {offer.badge}
                </div>
              </div>

              {/* Background Image with Overlay */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}
                />
                <div className="absolute inset-0 bg-black/30" />

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {hoveredCard === offer.id && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1">
                      <span className="text-white/90 text-sm font-medium">
                        {offer.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-white">
                      ₹{offer.offerPrice.toLocaleString("en-IN")}
                    </div>
                    <div className="text-white/60 line-through text-lg">
                      ₹{offer.originalPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-purple-200 mb-1">{offer.subtitle}</p>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  {offer.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {offer.features.slice(0, 3).map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1"
                    >
                      <span className="text-white/90 text-xs font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {offer.features.length > 3 && (
                    <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
                      <span className="text-white/90 text-xs font-medium">
                        +{offer.features.length - 3} more
                      </span>
                    </div>
                  )}
                </div>

                {/* Discount & CTA */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg px-2 py-1">
                      <span className="font-bold text-xs">
                        {offer.discount}% OFF
                      </span>
                    </div>
                    <div className="text-white/60 text-xs">
                      Valid till {offer.validTill}
                    </div>
                  </div>
                  <button className="w-full group/btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 text-sm">
                    Claim Offer
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
            </div>
          ))}
        </div>

        {/* Quick Deals Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
              Flash Deals
            </h2>
            <p className="text-white/70 text-lg">
              Grab these lightning-fast offers before they're gone!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickDeals.map((deal, index) => (
              <div
                key={index}
                className="group bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                    {deal.discount}% OFF
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {deal.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{deal.duration}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ₹{deal.price.toLocaleString("en-IN")}
                      </div>
                      <div className="text-white/50 line-through text-sm">
                        ₹{deal.originalPrice.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-12">
              Why Our Offers Are Unbeatable
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <benefit.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
            Don't Miss Out!
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            These exclusive offers won't last long. Book now and create memories
            that will last a lifetime in the breathtaking Northeast India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2">
              <Gift className="w-6 h-6" />
              Claim Your Offer Now
            </button>
            <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6" />
              View All Tours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
