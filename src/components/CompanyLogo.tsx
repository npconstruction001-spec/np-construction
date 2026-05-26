import React from "react";

interface CompanyLogoProps {
  className?: string;
  lightMode?: boolean;
}

export default function CompanyLogo({ className = "w-10 h-10", lightMode = false }: CompanyLogoProps) {
  // Use professional navy/gold theme matching company seal colors
  // If lightMode is true, use darker colors for visibility on white background change
  const brandBlue = lightMode ? "#112266" : "#2244aa";
  const textBlue = lightMode ? "#1e3a8a" : "#3b82f6";
  const starGold = "#eab308"; // Solid aesthetic gold

  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer concentric golden-blue rings */}
        <circle cx="50" cy="50" r="48" fill="none" stroke={brandBlue} strokeWidth="1.8" />
        <circle cx="50" cy="50" r="44" fill="none" stroke={brandBlue} strokeWidth="0.8" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="32" fill="none" stroke={brandBlue} strokeWidth="1.5" />

        {/* 6 Elegant Gold Stars grouped in 3s */}
        {/* Top-left star */}
        <polygon points="34,24 36.5,23 35.5,25.5 37.5,27 35,27 34,29.5 33,27 30.5,27 32.5,25.5 31.5,23" fill={starGold} />
        {/* Top-middle star */}
        <polygon points="50,17 52.5,16 51.5,18.5 53.5,20 51,20 50,22.5 49,20 46.5,20 48.5,18.5 47.5,16" fill={starGold} />
        {/* Top-right star */}
        <polygon points="66,24 68.5,23 67.5,25.5 69.5,27 67,27 66,29.5 65,27 62.5,27 64.5,25.5 63.5,23" fill={starGold} />

        {/* Bottom-left star */}
        <polygon points="34,76 36.5,75 35.5,77.5 37.5,79 35,79 34,81.5 33,79 30.5,79 32.5,77.5 31.5,75" fill={starGold} />
        {/* Bottom-middle star */}
        <polygon points="50,83 52.5,82 51.5,84.5 53.5,86 51,86 50,88.5 49,86 46.5,86 48.5,84.5 47.5,82" fill={starGold} />
        {/* Bottom-right star */}
        <polygon points="66,76 68.5,75 67.5,77.5 69.5,79 67,79 66,81.5 65,79 62.5,79 64.5,77.5 63.5,75" fill={starGold} />

        {/* Curved text path definitions */}
        <defs>
          {/* Top text path */}
          <path id="top-text-path" d="M 16 50 A 34 34 0 0 1 84 50" fill="none" />
          {/* Bottom text path */}
          <path id="bottom-text-path" d="M 84 50 A 34 34 0 0 1 16 50" fill="none" />
        </defs>

        {/* Circular text curves */}
        {/* "NP CONDUCTION" at the top */}
        <text className="font-sans font-extrabold text-[8.5px] uppercase select-none tracking-wider">
          <textPath href="#top-text-path" startOffset="50%" textAnchor="middle" fill={textBlue}>
            NP CONDUCTION
          </textPath>
        </text>

        {/* "Tel. 093-478-8375" at the bottom */}
        <text className="font-sans font-extrabold text-[7.5px] select-none tracking-tight">
          <textPath href="#bottom-text-path" startOffset="50%" textAnchor="middle" fill={textBlue}>
            Tel. 093-478-8375
          </textPath>
        </text>

        {/* Circular central backdrop circle for crispness */}
        <circle cx="50" cy="50" r="23" fill={lightMode ? "#ffffff" : "#020617"} opacity="0.3" />

        {/* Bold corporate "NP" letter mark in center */}
        <text
          x="50"
          y="58"
          className="font-serif font-black text-[22px] tracking-tight selection:bg-transparent text-center select-none"
          fill={brandBlue}
          textAnchor="middle"
        >
          NP
        </text>
      </svg>
    </div>
  );
}
