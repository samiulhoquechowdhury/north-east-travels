import { useState } from "react";

export default function ElegantAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqData = [
    {
      question: "What makes your Northeast India experiences different?",
      answer:
        "We believe travel should transform, not just transport. Our journeys are crafted by locals who've spent generations understanding these lands. Every experience includes authentic cultural immersion—from learning traditional crafts with artisans to sharing meals with families in remote villages. We limit groups to 12 travelers maximum, ensuring intimate connections and personalized attention that larger tours simply cannot provide.",
    },
    {
      question: "How do you ensure sustainable and responsible tourism?",
      answer:
        "Sustainability isn't a buzzword for us—it's our foundation. ₹500 from every booking directly supports local conservation projects and community development. We partner exclusively with locally-owned accommodations, employ regional guides, and source meals from village cooperatives. Our 'Leave No Trace' philosophy extends beyond environmental impact to cultural sensitivity, ensuring our presence enriches rather than disrupts local communities.",
    },
    {
      question: "What's included in your tour packages?",
      answer:
        "Our all-inclusive approach means no hidden surprises. Every package includes premium accommodations (heritage properties and eco-lodges), all meals featuring regional cuisine, private transportation with experienced drivers, expert local guides, entrance fees to all attractions, cultural activities and workshops, and 24/7 support. We also provide detailed pre-departure briefings, packing guides, and post-trip photo collections.",
    },
    {
      question: "How far in advance should we book our journey?",
      answer:
        "For the best experience, we recommend booking 2-3 months ahead, especially for peak seasons (October-March and June-August). This allows us to secure the finest accommodations and arrange special cultural experiences. However, we understand spontaneous travel desires—we've crafted beautiful journeys with just 2 weeks' notice. Early booking also offers better rates and ensures availability during festivals and special events.",
    },
    {
      question: "What if weather affects our planned activities?",
      answer:
        "Northeast India's weather can be as dramatic as its landscapes, and we plan accordingly. Every itinerary includes flexible alternatives—indoor cultural experiences, covered markets, monastery visits, or artisan workshops. Our local expertise means we know hidden gems perfect for rainy days. If weather significantly impacts your experience, we offer complimentary extensions or future trip credits. Your satisfaction, not rigid schedules, guides our decisions.",
    },
    {
      question: "Do you cater to solo travelers and special requirements?",
      answer:
        "Absolutely. Solo travelers find kindred spirits in our small groups, and we ensure comfortable single accommodations without excessive supplements. For special requirements—dietary restrictions, mobility considerations, photography interests, or spiritual pursuits—we customize experiences accordingly. Our pre-trip consultations identify your interests and needs, allowing us to tailor everything from meal selections to activity intensity levels.",
    },
    {
      question: "What's your cancellation and refund policy?",
      answer:
        "We believe in fair, transparent policies that protect both travelers and our local partners. Cancellations 60+ days prior receive full refunds minus processing fees. 30-59 days: 75% refund. 15-29 days: 50% refund. Less than 15 days: 25% refund, though we'll work to reschedule when possible. Medical emergencies and visa issues receive special consideration. We strongly recommend travel insurance and are happy to suggest trusted providers.",
    },
    {
      question: "How do we stay connected during our journey?",
      answer:
        "While we encourage digital detox for deeper cultural immersion, we ensure you're never truly disconnected. All accommodations provide WiFi, major towns have excellent mobile coverage, and we supply local SIM cards if needed. Our guides carry satellite phones for remote areas. We also provide daily check-in services for families back home and can arrange emergency communications anytime. Sometimes the best connection is with the present moment—but we're here when you need us.",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gray-50 rounded-full px-4 py-2 mb-8 border border-gray-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-gray-600 text-sm font-medium tracking-wide">
              Questions • Answered Thoughtfully
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight tracking-tight">
            Everything you
            <br />
            <span className="font-bold italic">need to know</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light">
            Honest answers to thoughtful questions.
            <br />
            <span className="text-gray-800 font-medium">
              Because great journeys begin with clarity
            </span>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-0 hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-300 group-hover:border-gray-400 ${
                        openIndex === index
                          ? "bg-gray-900 border-gray-900 rotate-45"
                          : "group-hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 transition-colors duration-300 ${
                          openIndex === index
                            ? "text-white"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <div className="w-12 h-0.5 bg-gray-200 mb-4"></div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
            Still have
            <span className="font-bold italic"> questions</span>?
          </h2>
          <p className="text-gray-600 font-light mb-8">
            We believe the best adventures begin with great conversations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+91-XXXXXXXXXX"
              className="group bg-gray-900 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-3 text-sm uppercase tracking-wide"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>Call Us</span>
            </a>

            <a
              href="mailto:hello@yourcompany.com"
              className="group border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 text-sm uppercase tracking-wide"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Email Us</span>
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            Average response time: Under 2 hours • Available 24/7 for
            emergencies
          </p>
        </div>
      </div>
    </section>
  );
}
