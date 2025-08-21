import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Data for navigation links
const navLinks = [
  { title: "Services", href: "#services" },
  { title: "Process", href: "#process" },
  { title: "About", href: "#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Variants for the main nav container (for staggered entry)
  const navVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Variants for individual child elements (for staggered entry)
  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  // Variants for the wavy button fill effect
  const fillVariants: Variants = {
    initial: { y: "100%" },
    hover: { y: "0%" },
  };

  // Variants for the wavy button text color change
  const textVariants: Variants = {
    initial: { color: "#ef4444" }, // Initial red text
    hover: { color: "#ffffff" }, // White text on hover
  };

  return (
    <>
      <motion.nav
        className="fixed top-4 inset-x-0 mx-auto max-w-2xl w-[95%] flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl backdrop-blur-xl bg-black/30 border border-white/20 shadow-lg z-50"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        {/* Logo */}
        <motion.a
          href="#"
          variants={itemVariants}
          className="text-xl font-bold text-white tracking-wide"
        >
          FuturoNova<span className="text-red-500"> AI</span>
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-200 font-medium">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {link.title}
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA Button with Wavy Fill Effect */}
        <motion.a
          href="#book"
          // Controls the hover animations for children
          initial="initial"
          whileHover="hover"
          // Controls the initial staggered animation
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          className="
            hidden md:block px-4 py-2 rounded-xl font-semibold whitespace-nowrap
            relative isolate overflow-hidden border-2 border-red-500
            transition-shadow hover:shadow-md hover:shadow-red-500/50
          "
        >
          <motion.span
            variants={textVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10"
          >
            Book a Call
          </motion.span>
          <motion.div
            variants={fillVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-0 bg-red-600"
            style={{
              width: "200%",
              height: "200%",
              borderRadius: "50%",
              left: "-50%",
            }}
          />
        </motion.a>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-200 hover:text-white text-3xl font-semibold transition-colors"
              >
                {link.title}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 rounded-xl bg-red-600 text-white text-xl font-semibold shadow-md"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
