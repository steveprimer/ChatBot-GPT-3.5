import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data for the 5-week process ---
const processSteps = [
  {
    title: "Phase 1: Discovery & Strategy",
    details: [
      "We begin with a deep dive into your business operations to understand your unique challenges and goals.",
      "Key performance indicators (KPIs) are established to define what success looks like for your AI implementation.",
    ],
  },
  {
    title: "Phase 2: Custom Solution Design",
    details: [
      "Our team architects a bespoke AI chatbot and voice bot strategy tailored to your specific workflows.",
      "We create detailed conversation flows and logic maps to ensure a seamless and intuitive user experience.",
    ],
  },
  {
    title: "Phase 3: Development & Integration",
    details: [
      "The AI solutions are built using cutting-edge technology, focusing on scalability and reliability.",
      "We seamlessly integrate the bots with your existing CRM, scheduling software, and other essential platforms.",
    ],
  },
  {
    title: "Phase 4: Testing & Refinement",
    details: [
      "Rigorous testing is conducted in a controlled environment to identify and resolve any potential issues.",
      "We gather feedback and make iterative improvements to optimize the bot's performance and accuracy.",
    ],
  },
  {
    title: "Phase 5: Launch & Optimization",
    details: [
      "The AI solutions are deployed and go live, ready to engage with your customers.",
      "We provide ongoing monitoring and performance analysis to ensure continued success and identify new opportunities.",
    ],
  },
];

// --- Main Component ---
export default function ProcessSection() {
  const [currentStep, setCurrentStep] = useState(0); // Using 0-based index

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, processSteps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const progressPercentage = (currentStep / (processSteps.length - 1)) * 100;

  return (
    <section className="bg-black text-white w-full px-4 py-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Headings */}
        <motion.p
          className="text-red-500 font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our 5-Week Implementation Plan
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          A Blueprint for Success
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          In just five weeks, we convert your objectives into tangible results.
          Our structured process guarantees clarity, precision, and measurable
          outcomes from kickoff to launch.
        </motion.p>

        {/* Stepper Timeline */}
        <div className="w-full max-w-2xl mb-12">
          <div className="relative flex justify-between items-center w-full">
            {/* Background Line */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-700"></div>

            {/* Progress Line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            ></motion.div>

            {/* Step Circles */}
            {processSteps.map((_, index) => (
              <div
                key={index}
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                  currentStep >= index
                    ? "bg-white text-black"
                    : "bg-gray-800 border-2 border-gray-600 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-left min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {processSteps[currentStep].title}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {processSteps[currentStep].details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-lg bg-gray-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous Week
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === processSteps.length - 1}
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-500 transition-colors"
          >
            Next Week
          </button>
        </div>
      </div>
    </section>
  );
}
