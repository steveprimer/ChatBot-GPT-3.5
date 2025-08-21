import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// --- SVG Icon Components ---
const StarIcon = (props) => (
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

const ChatIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
    />
  </svg>
);

// ✅ Replaced react-icons with inline SVGs
const BackIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const UserIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

// --- Analytics Helper (Unchanged) ---
function trackEvent(name, params = {}) {
  if (window.gtag) {
    window.gtag("event", name, {
      client_embed: window.ChatbotConfig?.client || "self_hosted",
      widget_version: window.ChatbotConfig?.widget_version || "dev",
      session_id:
        window.__CHATBOT_SESSION_ID__ ||
        (window.__CHATBOT_SESSION_ID__ =
          "s_" + Math.random().toString(36).slice(2, 9)),
      ...params,
    });
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); // For display
  const [messages, setMessages] = useState([]); // For backend API
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const chatEndRef = useRef(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
  const chatHeight = "600px";
  const chatWidth = "400px";

  // Store info to be sent with the API call
  const storeInfo = `
    Return Policy: You can return products within 7 days of delivery.
    Shipping: We offer free shipping on all orders above ₹999.
    Product Info: All our skincare products are vegan and cruelty-free.
  `;

  // --- Original useEffect Hooks ---

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      trackEvent("chat_opened");
    } else if (messages.length > 0) {
      trackEvent("conversation_length", { total_messages: messages.length });
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  useEffect(() => {
    trackEvent("chatbot_loaded");
  }, []);

  useEffect(() => {
    if (isOpen && !hasGreeted && !showWelcome) {
      setIsTyping(true);
      const welcomeText =
        "Hi there! 👋 I'm your AI assistant. Feel free to ask me anything about our products, shipping, or return policies!";
      setTimeout(() => {
        const botMessage = { sender: "Bot", text: welcomeText };
        setChat([botMessage]);
        setMessages([{ role: "assistant", content: welcomeText }]);
        setIsTyping(false);
        setHasGreeted(true);
      }, 1200);
    }
  }, [isOpen, showWelcome, hasGreeted]);

  // --- Original handleSend Function ---

  const handleSend = async (customInput) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim()) return;

    if (showWelcome && customInput) {
      setHasGreeted(true);
    }

    trackEvent("message_sent", { message_length: messageToSend.length });

    const userMessage = { sender: "You", text: messageToSend };
    const newMessages = [...messages, { role: "user", content: messageToSend }];

    setChat((prev) => [...prev, userMessage]);
    setMessages(newMessages);
    setInput("");
    if (showWelcome) setShowWelcome(false);
    setIsTyping(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        messages: newMessages,
        storeInfo,
      });

      const botText = res.data.reply;
      trackEvent("message_received", { reply_length: botText.length });

      const botMessage = { sender: "Bot", text: botText };
      setChat((prev) => [...prev, botMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: botText }]);
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = {
        sender: "Bot",
        text: "That was unexpected. Please try again.",
      };
      setChat((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      handleSend();
    }
  };

  const suggestedQuestions = [
    "Where is my order?",
    "What’s your return policy?",
    "How long is shipping?",
  ];

  // Animation variants for desktop and mobile
  const desktopVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const mobileVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 right-5 bg-gray-800 border border-gray-700 text-white p-4 rounded-lg shadow-xl z-[9998]"
          >
            <p className="text-sm text-gray-300">
              Chat with our AI for instant help!
            </p>
            <button
              onClick={() => {
                setIsOpen(true);
                setShowPopup(false);
              }}
              className="text-sm font-semibold text-red-500 mt-2 hover:underline"
            >
              Open Chat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
        }}
        className={`fixed bottom-5 right-5 w-16 h-16 bg-red-600 rounded-full items-center justify-center text-white shadow-lg shadow-red-500/50 z-[9999] cursor-pointer ${
          isOpen && isMobile ? "hidden" : "flex"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Chat"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <ChatIcon className="w-8 h-8" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {!isMobile && (
              <motion.div
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              />
            )}

            <motion.div
              variants={isMobile ? mobileVariants : desktopVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={isMobile ? {} : { width: chatWidth, height: chatHeight }}
              className={
                isMobile
                  ? "fixed inset-0 w-full h-full bg-black flex flex-col z-[9999]"
                  : "fixed bottom-24 right-5 bg-black border border-red-500/40 rounded-2xl shadow-2xl shadow-red-600/30 flex flex-col overflow-hidden z-[9999]"
              }
            >
              <div className="flex items-center p-4 border-b border-gray-700/50 relative flex-shrink-0">
                <button
                  onClick={() =>
                    isMobile ? setIsOpen(false) : setShowWelcome(true)
                  }
                  className="text-gray-300 hover:text-white transition-colors mr-2 absolute left-4 top-1/2 -translate-y-1/2"
                >
                  {isMobile ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    !showWelcome && <BackIcon className="w-5 h-5" />
                  )}
                </button>
                <h2 className="text-lg font-bold text-white text-center w-full">
                  AI Assistant
                </h2>
              </div>

              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                {showWelcome ? (
                  <WelcomeScreen
                    onStartChat={() => setShowWelcome(false)}
                    onQuestionClick={handleSend}
                    questions={suggestedQuestions}
                  />
                ) : (
                  <>
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 -mr-2">
                      {chat.map((msg, i) => (
                        <Message key={i} sender={msg.sender} text={msg.text} />
                      ))}
                      {isTyping && <TypingIndicator />}
                      <div ref={chatEndRef} />
                    </div>

                    {chat.length > 0 &&
                      chat[chat.length - 1].sender === "Bot" &&
                      !isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap gap-2 justify-center"
                        >
                          {suggestedQuestions.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(q)}
                              className="px-3 py-1.5 rounded-full border border-gray-600 text-gray-300 text-xs hover:bg-gray-800 transition"
                            >
                              {q}
                            </button>
                          ))}
                        </motion.div>
                      )}

                    <div className="mt-4 flex items-center space-x-2 flex-shrink-0">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything..."
                        className="flex-1 bg-gray-900 text-white placeholder-gray-500 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all min-w-0"
                      />
                      <motion.button
                        onClick={() => handleSend()}
                        className="px-4 py-2 rounded-md bg-red-600 text-white font-medium shadow-lg hover:shadow-red-500/50 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Send
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Sub-components for UI Clarity ---

const WelcomeScreen = ({ onStartChat, onQuestionClick, questions }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center text-center h-full text-white p-4"
  >
    <motion.div
      className="relative flex items-center justify-center w-32 h-32 mb-6"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute w-full h-full bg-red-600 rounded-full blur-2xl opacity-40" />
      <StarIcon className="w-12 h-12 text-white" />
    </motion.div>
    <h3 className="text-2xl font-bold mb-2">How can I help you?</h3>
    <p className="text-gray-400 mb-6 max-w-xs">
      Ask a question or choose from one of the options below.
    </p>
    <motion.button
      onClick={onStartChat}
      className="w-full max-w-xs px-4 py-2 mb-3 rounded-md bg-red-600 text-white font-medium shadow-lg hover:shadow-red-500/50 transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Start a Conversation
    </motion.button>
    <div className="flex flex-col w-full max-w-xs space-y-3">
      {questions.map((q, i) => (
        <motion.button
          key={i}
          onClick={() => onQuestionClick(q)}
          className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {q}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

const Message = ({ sender, text }) => {
  const isBot = sender === "Bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex items-end gap-2 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
          <StarIcon className="w-5 h-5 text-red-500" />
        </div>
      )}
      <div
        className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
          isBot
            ? "bg-gray-800 text-gray-200 rounded-bl-none"
            : "bg-red-600 text-white rounded-br-none"
        }`}
      >
        {text}
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-4 h-4 text-red-500" />
        </div>
      )}
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="flex items-end gap-2 justify-start"
  >
    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
      <StarIcon className="w-5 h-5 text-red-500" />
    </div>
    <div className="px-4 py-3 rounded-2xl bg-gray-800 rounded-bl-none flex items-center space-x-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-red-500 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  </motion.div>
);
