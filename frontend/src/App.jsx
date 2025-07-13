import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsChatText } from "react-icons/bs";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
const [videoLoaded, setVideoLoaded] = useState(false);

  const storeInfo = `
Return Policy: You can return products within 7 days of delivery.
Shipping: We offer free shipping on all orders above ₹999.
Product Info: All our skincare products are vegan and cruelty-free.
`;

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

const handleVideoLoaded = () => {
  setLoadingProgress(100);
  setTimeout(() => {
    setVideoLoaded(true);
  }, 500); // brief delay for smooth transition
};

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    const newMessages = [...messages, { role: "user", content: input }];

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
      const errorMessage = { sender: "Bot", text: "Something went wrong." };
      setChat(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const dotStyle = {
    width: "6px",
    height: "6px",
    backgroundColor: "#555",
    borderRadius: "50%",
    display: "inline-block",
    animation: "blink 1.2s infinite ease-in-out",
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

      <style>
        {`
          @keyframes blink {
            0%, 80%, 100% { opacity: 0; }
            40% { opacity: 1; }
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
  Powered by Scale
  <a
    href="https://scalebridge.netlify.app"
    style={{ textDecoration: "none" }}
  >
    <span style={{ color: "#0095ff" }}>Bridge</span>
  </a>
</p>


  </div>
</div>


      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#000000",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "0.3s ease",
        }}
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        <div
          style={{
            position: "relative",
            width: "28px",
            height: "28px",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FF00FF",
              fontSize: "28px",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              transform: isOpen ? "scale(1)" : "scale(0.8)",
            }}
          >
            ✖
          </span>

          <BsChatText
            size={28}
            color="#FF00FF"
            style={{
              position: "absolute",
              inset: 0,
              stroke: "#FF00FF",
              strokeWidth: 1,
              opacity: isOpen ? 0 : 1,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              transform: isOpen ? "scale(0.5)" : "scale(1)",
            }}
          />
        </div>
      </div>

      {/* Chat Window Wrapper (always rendered) */}
{/* Chat Window Wrapper (always rendered) */}
<div
  style={{
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: isOpen ? "500px" : "0px",
    backgroundColor: "#fff0ff", // light magenta tint
    color: "#000",
    border: "2px solid #FF00FF",
    borderRadius: "12px",
    padding: isOpen ? "1rem" : "0 1rem",
    zIndex: 9998,
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 6px 20px rgba(255, 0, 255, 0.3)",
    overflow: "hidden",
    maxHeight: isOpen ? "500px" : "0px",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0px)" : "translateY(20px)",
    pointerEvents: isOpen ? "auto" : "none",
    transition: "max-height 0.4s ease, opacity 0.3s ease, transform 0.3s ease, padding 0.3s ease",
  }}
>
  <div
    style={{
      fontWeight: "700",
      fontSize: "16px",
      marginBottom: "0.8rem",
      color: "#fff",
      backgroundColor: "#FF00FF",
      textAlign: "center",
      borderRadius: "8px",
      padding: "0.5rem 0",
    }}
  >
    AI Chat Support
  </div>

  <div
    style={{
      flex: 1,
      overflowY: "auto",
      marginBottom: "0.5rem",
      border: "1px solid #FFB3FF",
      padding: "0.5rem",
      borderRadius: "6px",
      height: "100%",
      backgroundColor: "#fff8ff",
    }}
  >
    {chat.map((msg, i) => (
      <p key={i} style={{ margin: "0.4rem 0" }}>
        <strong style={{ color: msg.sender === "You" ? "#FF00FF" : "#333" }}>
          {msg.sender}:
        </strong>{" "}
        {msg.text}
      </p>
    ))}
    <div ref={chatEndRef} />
    {isTyping && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "4px",
          paddingLeft: "2px",
        }}
      >
        <strong style={{ color: "#333" }}>Bot:</strong>
        <div style={{ display: "flex", gap: "3px" }}>
          <span style={{ ...dotStyle, backgroundColor: "#FF00FF" }}></span>
          <span style={{ ...dotStyle, backgroundColor: "#FF00FF", animationDelay: "0.2s" }}></span>
          <span style={{ ...dotStyle, backgroundColor: "#FF00FF", animationDelay: "0.4s" }}></span>
        </div>
      </div>
    )}
  </div>

  <div style={{ display: "flex" }}>
    <input
      type="text"
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={e => e.key === "Enter" && handleSend()}
      style={{
        flex: 1,
        padding: "0.4rem 0.5rem",
        borderRadius: "6px",
        border: "1px solid #FF00FF",
        fontSize: "14px",
        outlineColor: "#FF00FF",
      }}
      placeholder="Type your question..."
    />
    <button
      onClick={handleSend}
      style={{
        marginLeft: "0.5rem",
        padding: "0.4rem 0.7rem",
        backgroundColor: "#FF00FF",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "14px",
        cursor: "pointer",
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
