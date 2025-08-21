import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ecommerceImage from "../assets/ecommerce.jpg";
import fitnessImage from "../assets/fitness.jpg";
import realEstateImage from "../assets/realestate.jpg";

// --- Data for different industries ---
// FIX 1: Replaced local image imports with placeholder URLs.
// FIX 2: Corrected the 'image' property to be a string, not an object.
const industriesData = [
  {
    name: "E-commerce",
    title: "AI for E-commerce",
    description:
      "Elevate your online retail experience with our suite of AI-powered tools.",
    features: [
      "Instant, 24/7 AI-driven customer service",
      "Automated order tracking and management",
      "Personalized product recommendation engine",
      "Proactive abandoned cart recovery",
    ],
    summary:
      "Boost sales and build customer loyalty with smart, seamless automation.",
    image: ecommerceImage,
  },
  {
    name: "Fitness Centers",
    title: "AI for Fitness Centers",
    description:
      "Streamline member management and enhance engagement with intelligent automation.",
    features: [
      "24/7 membership inquiries and sign-ups",
      "Automated class scheduling and reminders",
      "Personalized workout and nutrition tips",
      "Instant support for facility questions",
    ],
    summary:
      "Increase member retention and attract new clients with a seamless digital experience.",
    image: fitnessImage,
  },
  {
    name: "Real Estate",
    title: "AI for Real Estate",
    description:
      "Capture and qualify leads around the clock, ensuring you never miss an opportunity.",
    features: [
      "24/7 lead capture from your website and ads",
      "Instant qualification of potential buyers and sellers",
      "Automated property viewing scheduler",
      "Immediate answers to property-specific questions",
    ],
    summary:
      "Convert more leads into clients by providing instant, intelligent responses anytime.",
    image: realEstateImage,
  },
];

// --- SVG Checkmark Icon ---
const CheckmarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// --- Main Component ---
export default function IndustriesSection() {
  const [selectedTab, setSelectedTab] = useState(industriesData[0]);

  return (
    <section className="bg-black text-white w-full px-4 py-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Headings */}
        <motion.p
          className="text-red-500 font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Sectors We Serve
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Intelligent Solutions for Diverse Industries
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          From dynamic startups to established enterprises, we engineer bespoke
          AI solutions that address the distinct challenges of your industry. We
          help you optimize processes, enhance customer engagement, and unlock
          new avenues for growth.
        </motion.p>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-12 border border-gray-800 rounded-full p-1">
          {industriesData.map((item) => (
            <button
              key={item.name}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                item.name === selectedTab.name
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setSelectedTab(item)}
            >
              {item.name === selectedTab.name && (
                <motion.div
                  layoutId="activeIndustryTab"
                  className="absolute inset-0 bg-red-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl flex flex-col md:flex-row overflow-hidden min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.name + "-image"}
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={selectedTab.image}
                alt={`${selectedTab.name} operations`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="w-full md:w-1/2 p-8 md:p-12 text-left flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab.name + "-content"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedTab.title}
                </h3>
                <p className="text-gray-400 mb-6">{selectedTab.description}</p>
                <ul className="space-y-3 mb-6">
                  {selectedTab.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckmarkIcon className="w-5 h-5 text-red-500 mr-3 shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 font-medium">
                  {selectedTab.summary}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
