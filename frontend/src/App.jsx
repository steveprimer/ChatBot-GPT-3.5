import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const storeInfo = `
Return Policy: You can return products within 7 days of delivery.
Shipping: We offer free shipping on all orders above ₹999.
Product Info: All our skincare products are vegan and cruelty-free.
`;

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
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4A90E2",
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
        {isOpen ? "✖" : "💬"}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "320px",
            height: "500px",
            backgroundColor: "#ffffff",
            color: "#000",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              fontSize: "16px",
              marginBottom: "0.8rem",
              color: "#333",
              borderBottom: "1px solid #eee",
              paddingBottom: "0.4rem",
            }}
          >
            Ai Chat Support
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: "0.5rem",
              border: "1px solid #eee",
              padding: "0.5rem",
              borderRadius: "6px",
              height: "100%",
              backgroundColor: "#fafafa",
            }}
          >
            {chat.map((msg, i) => (
              <p key={i} style={{ margin: "0.4rem 0" }}>
                <strong style={{ color: msg.sender === "You" ? "#4A90E2" : "#111" }}>
                  {msg.sender}:
                </strong>{" "}
                {msg.text}
              </p>
            ))}
            <div ref={chatEndRef} />
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
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
              placeholder="Type your question..."
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "0.5rem",
                padding: "0.4rem 0.7rem",
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
