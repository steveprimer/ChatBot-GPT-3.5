import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data for the FAQ section ---
const faqData = {
  General: [
    {
      question: "What makes your AI solutions different from others?",
      answer:
        "Our key differentiator is our deep customization. We don't offer one-size-fits-all solutions. Instead, we conduct a thorough business audit to understand your specific workflows and challenges, then build a bespoke AI that integrates seamlessly and delivers measurable results.",
    },
    {
      question: "How long is the implementation process?",
      answer:
        "Our standard implementation follows a structured 5-week plan, from initial discovery to full launch. This timeline ensures a thorough, well-tested, and successful deployment without unnecessary delays.",
    },
    {
      question: "Can your AI integrate with our current software?",
      answer:
        "Absolutely. We specialize in seamless integration with a wide range of existing systems, including CRMs, scheduling software, and e-commerce platforms. Our goal is to enhance your current workflows, not replace them.",
    },
    {
      question: "What kind of ROI can we anticipate?",
      answer:
        "Clients typically see a significant return on investment through increased lead conversion, reduced operational costs from automation, and improved customer satisfaction scores. We establish clear KPIs during the discovery phase to track and measure the financial impact.",
    },
  ],
  Voicebot: [
    {
      question: "How human-like is the voicebot's conversation?",
      answer:
        "Our voicebots are built on advanced natural language processing (NLP) models, allowing for incredibly fluid and human-like conversations. They can understand context, handle complex queries, and even detect user sentiment.",
    },
    {
      question: "Can the voicebot handle multiple languages?",
      answer:
        "Yes, we can configure your voicebot to be multilingual, allowing you to serve a broader customer base and provide a more personalized experience for non-native English speakers.",
    },
  ],
  Chatbot: [
    {
      question: "Is the chatbot available on platforms other than our website?",
      answer:
        "Yes. While website integration is standard, we can also deploy your chatbot across various messaging platforms like Facebook Messenger, WhatsApp, and Slack to meet your customers where they are.",
    },
  ],
  "AI Consulting": [
    {
      question: "What does the AI consulting process involve?",
      answer:
        "Our AI consulting service begins with a strategic audit to identify the best opportunities for AI within your business. We then provide a detailed roadmap, technology recommendations, and a phased implementation plan to guide your digital transformation.",
    },
  ],
};

const categories = Object.keys(faqData);

// --- Accordion Item Component ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-6"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlusIcon className="w-6 h-6 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Helper Icon ---
const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

// --- Main FAQ Section Component ---
export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

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
          Frequently Asked Questions
        </motion.p>
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Your Questions, Answered
        </motion.h2>
        <motion.p
          className="text-gray-400 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Curious about how our AI can benefit your business? Explore our FAQ
          for answers to common questions. For more specific inquiries, our team
          is always ready to help.
        </motion.p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenQuestionIndex(null); // Close open question on category change
              }}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="w-full max-w-3xl">
          {faqData[activeCategory].map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openQuestionIndex === index}
              onClick={() => handleAccordionClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
