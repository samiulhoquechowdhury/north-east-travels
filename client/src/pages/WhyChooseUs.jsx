import { useState, useEffect } from "react";

// Mock Link component for demo - replace with your actual react-router-dom Link
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const reasons = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "Born from passion",
      subtitle: "Not profit margins",
      description:
        "Every journey we craft comes from our deep love for Northeast India. We're not tour operators—we're storytellers who happen to know the most beautiful stories.",
      detail:
        "Founded by local explorers who spent decades discovering hidden gems",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Local wisdom",
      subtitle: "Beyond guidebooks",
      description:
        "Our guides aren't just showing you places—they're sharing their ancestral knowledge. Experience destinations through the eyes of those who call them home.",
      detail:
        "Deep partnerships with indigenous communities across all seven sister states",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Mindful travel",
      subtitle: "Leave only footprints",
      description:
        "Tourism that gives back. Every booking contributes to local communities and conservation efforts. Travel with purpose, return with perspective.",
      detail:
        "₹500 from every booking goes directly to local conservation projects",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Moments, not monuments",
      subtitle: "Experiences over attractions",
      description:
        "We don't just take you to places—we create moments that become memories. Watch sunrise with monks, learn ancient crafts, taste recipes passed down generations.",
      detail: "Average of 15 unique cultural interactions per journey",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Trust, earned daily",
      subtitle: "Not marketed cheaply",
      description:
        "No hidden costs, no surprise changes, no compromises on quality. What we promise is what you experience—backed by 50,000+ satisfied travelers.",
      detail: "100% transparent pricing with 24/7 support guarantee",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Small groups",
      subtitle: "Big connections",
      description:
        "Maximum 12 travelers per group. Because the best conversations happen around small campfires, and the most beautiful moments are best shared intimately.",
      detail: "Personalized attention with expert local guides throughout",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "They didn't just show me Meghalaya—they helped me discover a part of myself I never knew existed. The living root bridges weren't just a destination; they became a metaphor for my own resilience.",
      journey: "7-day Meghalaya Explorer",
      avatar: "PS",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      text: "What struck me most wasn't the rhinos in Kaziranga, but how our guide spoke about them—with the reverence of someone protecting family. That's when I realized this wasn't tourism; this was homecoming.",
      journey: "Wildlife & Culture Combo",
      avatar: "RK",
    },
    {
      name: "Sarah Chen",
      location: "Singapore",
      text: "I've traveled to 40 countries, but nowhere have I felt more welcomed than in the villages of Majuli. The monks didn't just show us their monastery—they invited us into their philosophy of life.",
      journey: "Spiritual Northeast Journey",
      avatar: "SC",
    },
  ];

  const stats = [
    {
      number: "15",
      label: "Years of expertise",
      sublabel: "in Northeast India",
    },
    { number: "50K+", label: "Stories created", sublabel: "and memories made" },
    {
      number: "4.9",
      label: "Experience rating",
      sublabel: "from real travelers",
    },
    {
      number: "100%",
      label: "Authentic promise",
      sublabel: "no tourist traps",
    },
  ];

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
              The Difference • Our Promise
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            Why travelers
            <br />
            <span className="font-bold italic">choose us</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            In a world full of travel companies, we believe in being different.
            <br />
            <span className="text-gray-800 font-medium">
              Here's what sets us apart
            </span>
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 hover:-translate-y-2 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-6">
                {reason.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {reason.title}
              </h3>

              <p className="text-gray-800 font-medium text-sm mb-4 italic">
                {reason.subtitle}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {reason.description}
              </p>

              <p className="text-xs text-gray-400 uppercase tracking-wide">
                {reason.detail}
              </p>

              <div className="mt-4 w-12 h-0.5 bg-gray-200 group-hover:bg-gray-400 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our journey in
              <span className="font-bold italic"> numbers</span>
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Every number tells a story of trust, quality, and unforgettable
              experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Stories from
              <span className="font-bold italic"> fellow travelers</span>
            </h2>
            <p className="text-lg text-gray-600 font-light">
              The most honest reviews come from the heart
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-700">
                    {testimonials[activeTestimonial].avatar}
                  </span>
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 font-light italic leading-relaxed mb-8">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>

                <div className="text-center">
                  <div className="font-semibold text-gray-900 mb-1">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {testimonials[activeTestimonial].location}
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    {testimonials[activeTestimonial].journey}
                  </div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center space-x-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? "bg-gray-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Promise Section */}
        <div className="bg-gray-900 rounded-2xl p-12 text-white text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Our promise is
            <span className="font-bold italic"> simple</span>
          </h2>
          <p className="text-xl font-light mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            We'll treat your journey like our own adventure. We'll share our
            Northeast India like we're introducing you to our family. And we'll
            make sure you return home not just with photos, but with stories
            that change you.
          </p>
          <div className="inline-block w-20 h-0.5 bg-white/30"></div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Ready to discover
              <span className="font-bold italic"> the difference</span>?
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Your Northeast India story begins with a conversation
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Link
              to="/browse/tours"
              className="group bg-gray-900 text-white font-medium py-4 px-8 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl"
            >
              <span>Start Your Journey</span>
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

            <Link
              to="/contact"
              className="group border border-gray-300 text-gray-700 font-medium py-4 px-8 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 text-sm uppercase tracking-wide"
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>Let's Talk</span>
            </Link>
          </div>

          {/* Trust Footer */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex justify-center items-center space-x-12 text-gray-400">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm">Award-winning experiences</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">100% satisfaction guaranteed</span>
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
                <span className="text-sm">Locally owned & operated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
