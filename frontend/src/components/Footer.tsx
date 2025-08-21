import React from "react";

// --- Helper Icon ---
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

// --- Main Footer Component ---
export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 w-full px-4 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Logo and CTA */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-8 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-6 sm:mb-0">
            <StarIcon className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">FuturoNova</span>
          </div>
          <a
            href="#book"
            className="px-5 py-2 rounded-lg border border-gray-600 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Book A Discovery Call
          </a>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* About Column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">
              About FuturoNova AI
            </h4>
            <p className="text-sm leading-relaxed">
              We are a premier provider of AI-powered solutions, specializing in
              advanced chatbot and voice agent technologies for a diverse range
              of businesses. Our mission is to transform client interactions
              through personalized, efficient, and scalable AI.
            </p>
          </div>

          {/* Our Solutions Column */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Our Solutions
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI-Powered Virtual Receptionist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Interactive Website Chatbot
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Proactive AI Outbound Agent
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  24/7 Customer Support System
                </a>
              </li>
            </ul>
          </div>

          {/* Industries We Serve Column */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Industries We Serve
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Healthcare Clinics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  E-commerce Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Fitness & Wellness Centers
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us Column */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:contact@futuronova.ai"
                  className="hover:text-white transition-colors"
                >
                  contact@futuronova.ai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm">
          <p className="mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} FuturoNova AI. All rights
            reserved.
          </p>
          <p className="mb-4 sm:mb-0">
            Website By{" "}
            <a
              href="https://scalebridge.netlify.app"
              className="text-red-500 hover:underline"
            >
              ScaleBridge
            </a>
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
