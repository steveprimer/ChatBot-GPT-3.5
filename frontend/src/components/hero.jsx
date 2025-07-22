import React, { useState, useEffect } from "react";

export default function Hero() {
  const [loadingProgress, setLoadingProgress] = useState(0); // Loading screen progress
  const [videoLoaded, setVideoLoaded] = useState(false); // Hero video load check

  // Progress bar simulation for loading screen
  useEffect(() => {
    if (loadingProgress < 100) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
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
          <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            {loadingProgress}%
          </p>
        </div>
      )}

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
          <h1 className="hero-heading">Your AI Chatbot,</h1>
          <p className="hero-subtext">Available 24/7 for your customers</p>
          <p className="powered-by-text">
            Powered by{" "}
            <a
              href="https://scalebridge.netlify.app"
              className="powered-by-link"
            >
              Scale<span className="powered-by-highlight">Bridge</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
