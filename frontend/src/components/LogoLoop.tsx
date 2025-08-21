import React from "react";
import { motion, Variants } from "framer-motion";

// --- SVG Icon Components ---
const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);
const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" fill="currentColor" {...props}>
    <path d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z"></path>
    <path
      fill="#fff"
      d="M99.2192 103.12V53.2441L69.543 78.2334V103.12H99.2192ZM53.2821 25.0423H28.7808V103.12H53.2821V25.0423Z"
    ></path>
  </svg>
);
const TypescriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" fill="currentColor" {...props}>
    <path fill="#007ACC" d="M0 0h128v128H0z"></path>
    <path
      fill="#fff"
      d="M22.01 22.13h83.91v83.74h-25.3V48.42l-17.49 17.49-17.3-17.3v57.45h-23.82z"
    ></path>
  </svg>
);
const TailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M16 2.667c-7.36 0-13.333 5.973-13.333 13.333S8.64 29.333 16 29.333 29.333 23.36 29.333 16 23.36 2.667 16 2.667zM10.187 19.307a.987.987 0 01-1.387 0l-1.12-1.12a.987.987 0 010-1.387l6.027-6.027a.987.987 0 011.387 0l1.12 1.12a.987.987 0 010 1.387l-6.027 6.027zm11.626 0a.987.987 0 01-1.386 0l-1.12-1.12a.987.987 0 010-1.387l6.026-6.027a.987.987 0 011.387 0l1.12 1.12a.987.987 0 010 1.387l-6.026 6.027z"></path>
  </svg>
);
const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.33 13.2L14.2 21.4c-.53.53-1.2.8-1.9.8H4.9c-1.5 0-2.7-1.2-2.7-2.7v-7.4c0-.7.27-1.37.8-1.9l8.1-8.2c.53-.53 1.2-.8 1.9-.8h7.4c1.5 0 2.7 1.2 2.7 2.7v7.5c0 .6-.27 1.2-.8 1.8zM9.9 9.3c0-.9-.8-1.7-1.7-1.7s-1.7.8-1.7 1.7.8 1.7 1.7 1.7 1.7-.8 1.7-1.7zm6.2 3.8c-.4-.4-.9-.6-1.5-.6h-2.2v3.4c0 .4-.3.6-.6.6s-.6-.2-.6-.6v-4c0-.4.3-.6.6-.6h2.8c1.2 0 2.2 1 2.2 2.2 0 .7-.3 1.3-.8 1.6z"></path>
  </svg>
);
const FramerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"></path>
  </svg>
);

// --- Data for the logos ---
const techLogos = [
  { node: <ReactIcon />, href: "https://react.dev" },
  { node: <NextjsIcon />, href: "https://nextjs.org" },
  { node: <TypescriptIcon />, href: "https://typescriptlang.org" },
  { node: <TailwindIcon />, href: "https://tailwindcss.com" },
  { node: <NodejsIcon />, href: "https://nodejs.org" },
  { node: <FramerIcon />, href: "https://framer.com" },
];

// --- LogoLoop Component ---
type LogoNode = {
  node?: React.ReactNode;
  href?: string;
};

interface LogoLoopProps {
  logos: LogoNode[];
  speed?: number;
  direction?: "left" | "right";
  gap?: number;
  logoHeight?: number;
}

function LogoLoop({
  logos = [],
  speed = 40,
  direction = "left",
  gap = 60,
  logoHeight = 36,
}: LogoLoopProps) {
  if (!Array.isArray(logos) || logos.length === 0) {
    return null;
  }

  const items = [...logos, ...logos];

  const loopVariants: Variants = {
    animate: {
      x: direction === "left" ? "-50%" : "0%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative w-full max-w-4xl overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ gap }}
        variants={loopVariants}
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate="animate"
      >
        {items.map((logo, i) => (
          <a
            key={i}
            href={logo.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center shrink-0 text-3xl text-gray-400 hover:text-white transition-colors"
            // ✅ FIX: Added a width property to ensure the icon container is a square
            style={{ height: logoHeight, width: logoHeight }}
          >
            {logo.node}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

// --- Main Exported Component ---
// This component wraps the LogoLoop in a section so it's easy to see and use.
export default function LogoSection() {
  return (
    <section className="bg-black py-12">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-sm text-gray-400 mb-14">
          Trusted by forward-thinking businesses worldwide
        </p>
        <LogoLoop logos={techLogos} />
      </div>
    </section>
  );
}
