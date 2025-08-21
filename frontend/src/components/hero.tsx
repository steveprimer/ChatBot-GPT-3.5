import React from "react";
import { motion } from "framer-motion";

// --- SVG Icon Components ---
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
      stroke="white"
      strokeWidth={0.5}
    />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Glowing Orb Container */}
        <div className="relative flex items-center justify-center w-64 h-64 mb-6">
          <motion.div
            className="absolute w-full h-full bg-red-600 rounded-full blur-3xl opacity-50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full rounded-full border border-red-500/60"
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "linear",
              }}
            />
          ))}
          <motion.div
            className="relative z-10 text-white"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <StarIcon className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Boost Customer Engagement
          <br />
          with FuturoNova AI Bots
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          The next-generation AI solution for businesses — available 24/7 to
          engage, assist, and grow your customers.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.a
            href="#demo"
            className="px-6 py-3 rounded-md bg-red-600 text-white font-medium shadow-lg hover:shadow-red-500/50 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch A Demo
          </motion.a>
          <motion.a
            href="#book"
            className="px-6 py-3 rounded-md border border-gray-500 text-gray-300 font-medium hover:bg-gray-800 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book A Call
          </motion.a>
        </div>
      </div>
    </section>
  );
}
