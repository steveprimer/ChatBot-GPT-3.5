import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRegMessage, FaUser } from "react-icons/fa6";

// Main ChatBot Component
function App() {
  // UI States
  const [isOpen, setIsOpen] = useState(false); // Chat window toggle
  const [input, setInput] = useState(""); // User input field
  const [chat, setChat] = useState([]); // Chat history (display)
  const [messages, setMessages] = useState([]); // Chat history (for backend)
  const [isTyping, setIsTyping] = useState(false); // Bot typing animation
  const [loadingProgress, setLoadingProgress] = useState(0); // Loading screen progress
  const [videoLoaded, setVideoLoaded] = useState(false); // Hero video load check
  const [showPopup, setShowPopup] = useState(false); // AI popup trigger
  const chatEndRef = useRef(null); // Ref to scroll chat to bottom

  const storeInfo = `
Return Policy: You can return products within 7 days of delivery.
Shipping: We offer free shipping on all orders above ₹999.
Product Info: All our skincare products are vegan and cruelty-free.
`;

  // Show popup after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Progress bar simulation for loading screen
  useEffect(() => {
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const next = prev + Math.floor(Math.random() * 5) + 1;
          return next >= 100 ? 100 : next;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [loadingProgress]);

  // Callback when hero video is loaded
  const handleVideoLoaded = () => {
    setLoadingProgress(100);
    setTimeout(() => setVideoLoaded(true), 500); // smooth transition
  };

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  
  useEffect(() => {
  if (isOpen && chat.length === 0) {
    setIsTyping(true);
    const welcomeText = "Hi there! 👋 I'm your AI assistant. Feel free to ask me anything about our products, shipping, or return policies!";

    setTimeout(() => {
      const botMessage = { sender: "Bot", text: welcomeText };
      setChat([botMessage]);
      setMessages([{ role: "assistant", content: welcomeText }]);
      setIsTyping(false);
    }, 1200); // 1.2s delay
  }
}, [isOpen]);


  // Handle sending user message
 const handleSend = async (customInput) => {
  const messageToSend = customInput || input;
  if (!messageToSend.trim()) return;

  const userMessage = { sender: "You", text: messageToSend };
  const newMessages = [...messages, { role: "user", content: messageToSend }];

  setChat([...chat, userMessage]);
  setMessages(newMessages);
  setInput("");
  setIsTyping(true);

  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
      messages: newMessages,
      storeInfo,
    });

    const botText = res.data.reply;
    const botMessage = { sender: "Bot", text: botText };
    setChat(prev => [...prev, botMessage]);
    setMessages(prev => [...prev, { role: "assistant", content: botText }]);
  } catch (err) {
    console.error(err);
    setChat(prev => [...prev, { sender: "Bot", text: "That was unexpected." }]);
  } finally {
    setIsTyping(false);
  }
};


  // Typing indicator style
  const waveDotStyle = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  backgroundColor: "#C4008F", // Match brand color
  display: "inline-block",
  animation: "wave 1.2s infinite ease-in-out",
};

const handleSuggestedMessage = (msg) => {
  setChat(prev => [...prev, { sender: "You", text: msg }]);
  sendMessage(msg); // Call your existing message send function
};


  return (
    <>

    {!videoLoaded && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0a0014",
      color: "#FF00FF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
      transition: "opacity 0.5s ease",
    }}
  >
    <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Loading</h2>
    <div
      style={{
        width: "80%",
        height: "10px",
        background: "#222",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${loadingProgress}%`,
          height: "100%",
          background: "linear-gradient(to right, #FF00FF, #00FFFF)",
          transition: "width 0.3s ease",
        }}
      ></div>
    </div>
    <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>{loadingProgress}%</p>
  </div>
)}

       {/* Typing Animation Keyframes */}
      <style>
        {`
    @keyframes wave {
      0%, 60%, 100% {
        transform: translateY(0);
      }
      30% {
        transform: translateY(-8px);
      }
    }
  `}
      </style>
       
      {/* Hero Section with Neon Background */}
<div
  style={{
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  }}
>
  {/* Background Video */}
  <video
  autoPlay
  loop
  muted
  playsInline
  onLoadedData={handleVideoLoaded}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -2,
  }}
  src="/aichatbot(1).mp4"
/>


  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: -1,
    }}
  />

  {/* Hero Content */}
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#FF00FF",
      padding: "0 1rem",
      zIndex: 1,
    }}
  >
    <h1
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        textShadow: "0 0 15px #FF00FF",
        marginBottom: "1rem",
      }}
    >
      AI Chat Support Bot
    </h1>
    <p
      style={{
        fontSize: "1.25rem",
        maxWidth: "600px",
        color: "#ffffffcc",
        textShadow: "0 0 10px #FF00FF",
        lineHeight: "1.6",
      }}
    >
      24/7 Automated Replies · Live Order Help · Return & Shipping Info · Product Details · Personalized Guidance
    </p>
    <p
  style={{
    fontSize: "3rem",
    maxWidth: "600px",
    fontWeight: "bold",
    color: "#ffffffff",
    lineHeight: "1.6",
  }}
>
  Powered by <a
    href="https://scalebridge.netlify.app"
    style={{ textDecoration: "none", color: "#ffffffff" }}
  >Scale
  
    <span style={{ color: "#0095ff" }}>Bridge</span>
  </a>
</p>


  </div>
</div>

      {/* Popup Chat Teaser */}
      {showPopup && (
        <div style={{
          position: "fixed", bottom: "20px", right: "100px", backgroundColor: "#0f172a",
          color: "white", border: "1px solid #efe9e9ff", borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", padding: "12px 16px", zIndex: 9999
        }}>
          <p style={{ fontSize: "14px", margin: 0 }}> Chat with our AI assistant for instant help!</p>
          <button onClick={() => { setShowPopup(false); setIsOpen(true); }}
            style={{
              marginTop: "8px", color: "#fd1616ff", background: "none", border: "none",
              fontSize: "13px", textDecoration: "underline", cursor: "pointer", padding: 0
            }}>
            Open Chat
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div onClick={() => {setIsOpen(!isOpen); setShowPopup(false);}} style={{
        position: "fixed", bottom: "20px", right: "20px", backgroundColor: "#fff7caff",
        color: "#fff", borderRadius: "50%", width: "60px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", zIndex: 9999, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
        
      }}>
        <div style={{ position: "relative", width: "28px", height: "28px" }}>
          <span style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#C4008F", fontSize: "28px", opacity: isOpen ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transform: isOpen ? "scale(1)" : "scale(0.8)"
          }}>✖</span>
          <FaRegMessage 
            size={28}
            color="#C4008F"
            style={{
              position: "absolute", inset: 0, stroke: "#C4008F", strokeWidth: 25,
              opacity: isOpen ? 0 : 1, transform: isOpen ? "scale(0.5)" : "scale(1)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              // filter: "drop-shadow(0 0 4px #C4008F)"
            }}
          />
        </div>
      </div>

      {/* Background Blur Overlay */}
{isOpen && (
  <div
    onClick={() => setIsOpen(false)} // optional: clicking outside closes chat
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      backgroundColor: "rgba(0, 0, 0, 0.2)", // optional darken
      zIndex: 9997, // just below chat window (9998)
      transition: "all 0.3s ease",
    }}
  />
)}


      {/* Chat Window */}
      <div style={{
        position: "fixed", bottom: "90px", right: "20px", width: "320px",
        height: isOpen ? "500px" : "0px", background: "linear-gradient(145deg, #58002aff, #1a1a1a)",
        color: "#f2f2f2", border: "1.5px solid #C4008F", borderRadius: "15px",
        padding: isOpen ? "1rem" : "0 1rem", zIndex: 9998, display: "flex", flexDirection: "column",
        boxShadow: "0 0 12px rgba(196, 0, 143, 0.5)", overflow: "hidden",
        opacity: isOpen ? 1 : 0, transform: isOpen ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s ease", pointerEvents: isOpen ? "auto" : "none"
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif", color: "#fff",
  fontWeight: "700",
  fontSize: "16px",
  marginBottom: "0rem",
  width: "40%", // Set exact width
  backgroundColor: "#C4008F",
  textAlign: "center",
  borderRadius: "20px",
  padding: "0.5rem 0",
  boxShadow: "0 0 8px #C4008F",
  margin: "0 auto", // Center horizontally
 
}}>
  AI Support
</div>

        {/* Chat Messages */}
        <div style={{
          flex: 1, overflowY: "auto", marginBottom: "0.5rem", 
          padding: "0.5rem", borderRadius: "6px", backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)", backgroundColor: "rgba(0, 0, 0, 0.1)",
          boxShadow: "0 0   8px rgba(0, 0, 0, 0.1)",
        }}>
          {chat.map((msg, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      justifyContent: msg.sender === "You" ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      marginBottom: "12px",
    }}
  >
    {/* Avatar for Bot */}
    {msg.sender !== "You" && (
      <div
        style={{
          width: "32px",
          height: "32px",
          backgroundColor: "#C4008F",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "8px",
        }}
      >
        <FaRegMessage color="#fff" size={16} />
      </div>
    )}

    {/* Message Bubble */}
    <div
      style={{
        backgroundColor: msg.sender === "You" ? "#C4008F" : "#2C2C2E",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "16px",
        maxWidth: "75%",
        fontSize: "14px",
        lineHeight: "1.5",
        whiteSpace: "pre-wrap",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {msg.text}
    </div>

    {/* Avatar for User */}
    {msg.sender === "You" && (
      <div
        style={{
          width: "32px",
          height: "32px",
          backgroundColor: "#C4008F",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "8px",
        }}
      >
        <FaUser color="#fff" size={16} />
      </div>
    )}
  </div>
))}


          <div ref={chatEndRef} />
          {/* Typing Animation */}
          {isTyping && (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      marginBottom: "12px",
    }}
  >
    {/* Avatar Icon */}
    <div
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: "#C4008F",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "8px",
      }}
    >
      <FaRegMessage color="#fff" size={16} />
    </div>

    {/* Typing Bubble with Wave Animation */}
    <div
      style={{
        backgroundColor: "#2C2C2E",
        padding: "10px 14px",
        borderRadius: "16px",
        display: "flex",
        gap: "4px",
      }}
    >
      <div style={{ ...waveDotStyle, animationDelay: "0s" }} />
<div style={{ ...waveDotStyle, animationDelay: "0.2s" }} />
<div style={{ ...waveDotStyle, animationDelay: "0.4s" }} />

    </div>
  </div>
)}
{/* Suggested Questions */}
<div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
  {["Where is my order?", "What’s your return policy?", "How long is shipping?", "Do you ship internationally?"].map((q, idx) => (
    <div
      key={idx}
      onClick={() => handleSend(q)}
      style={{
        backgroundColor: "#fff7ca",
        color: "#000",
        padding: "6px 10px",
        borderRadius: "12px",
        fontSize: "13px",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        transition: "background 0.3s",
      }}
    >
      {q}
    </div>
  ))}
</div>



        </div>

        {/* Chat Input */}
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            style={{
              flex: 1, padding: "0.4rem 0.5rem", borderRadius: "10px", height: "30px",
              border: "1px solid #C4008F", fontSize: "14px", outlineColor: "#C4008F"
            }}
          />
          <button
            onClick={handleSend}
            style={{
              marginLeft: "0.5rem", padding: "0.4rem 0.7rem", backgroundColor: "#C4008F",
              color: "white", border: "none", borderRadius: "6px", fontSize: "20px",
              cursor: "pointer"
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}


export default App;
