import React, { useState } from "react";
import { motion } from "framer-motion";

// --- Data ---
const services = ["Chat Bots", "Voice Bots", "AI Consulting"];

const features = [
  {
    title: "24/7 On-Demand Support",
    description:
      "Ensure your customers are never left without answers, even outside of standard business hours.",
    visual: (
      <div className="relative w-full h-32">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl font-bold text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          2:42 <span className="text-3xl">AM</span>
        </motion.div>
        <motion.div
          className="absolute top-16 left-0 bg-white text-black text-xs p-2 rounded-lg rounded-bl-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          I need to book an appointment, can you help?
        </motion.div>
        <motion.div
          className="absolute top-24 right-0 bg-red-500 text-white text-xs p-2 rounded-lg rounded-br-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Of course! What is your name and the reason for your visit?
        </motion.div>
      </div>
    ),
  },
  {
    title: "Seamless Appointment Booking",
    description:
      "Allow clients to effortlessly book or modify their appointments directly within the chat.",
    visual: (
      <div className="relative w-full h-32 flex flex-col items-center justify-center">
        <motion.div
          className="bg-white text-black text-xs p-2 rounded-lg mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Book a meeting at 6pm today.
        </motion.div>
        <motion.div
          className="bg-red-500 text-white text-xs p-2 rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Done! I have booked your meeting.
        </motion.div>
      </div>
    ),
  },
  {
    title: "Effective Lead Generation",
    description:
      "Transform website traffic into qualified leads through dynamic and interactive conversations.",
    visual: (
      <div className="relative w-full h-32 flex items-center justify-center">
        <motion.div
          className="flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Person Icon */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            <div className="w-12 h-10 bg-gray-600 rounded-t-lg"></div>
          </div>
          {/* Laptop Icon */}
          <div className="w-20 h-12 bg-gray-600 border-4 border-black rounded-t-lg relative -ml-4">
            <div className="w-24 h-2 bg-gray-600 absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-b-sm"></div>
          </div>
        </motion.div>
      </div>
    ),
  },
];

// --- Components ---

function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="bg-black text-white w-full max-w-4xl mx-auto px-4 py-20 text-center">
      <motion.p
        className="text-red-500 font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Core Offerings
      </motion.p>
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Customized AI to Amplify Your Success
      </motion.h2>
      <motion.p
        className="text-gray-400 max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        We provide a suite of cutting-edge services built to meet your specific
        operational demands. From intelligent automation to bespoke strategic
        frameworks, learn how our expertise can drive sustainable growth and
        turn your business challenges into valuable opportunities.
      </motion.p>
      <motion.div
        className="flex items-center justify-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {services.map((service) => (
          <button
            key={service}
            onClick={() => setActiveService(service)}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
              activeService === service
                ? "bg-red-600 text-white"
                : "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800"
            }`}
          >
            {service}
          </button>
        ))}
      </motion.div>
    </section>
  );
}

function FeatureCards() {
  return (
    <section className="bg-black w-full px-4 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-400 mb-6">{feature.description}</p>
            <div className="bg-black rounded-lg p-4 h-40 flex items-center justify-center">
              {feature.visual}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- Main App Export ---
export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <ServicesSection />
      <FeatureCards />
    </div>
  );
}
