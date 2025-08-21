import React from "react";
import Hero from "./components/hero";
import LogoSection from "./components/LogoLoop";
import ChatBot from "./components/chatbot";
import Navbar from "./components/navbar";
import ServicesSection from "./components/Services";
import ProcessSection from "./components/Process";
import IndustriesSection from "./components/Industries";
import FAQSection from "./components/FAQ";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <LogoSection />
      <ServicesSection />
      <ProcessSection />
      <IndustriesSection />
      <FAQSection />
      <Footer />

      <ChatBot />
    </div>
  );
}

export default App;
