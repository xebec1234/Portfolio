"use client";

import React from "react";
import ThreeNetwork from "./3d/ThreeNetwork";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      {/* Text Block */}
      <div className="relative z-10 px-8">
        <h1 className="text-left mt-14 text-[20vw] sm:text-[7vw] font-extrabold leading-[1.1] whitespace-nowrap">
          <span className="text-[#a855f7]">Developing</span> Impactful
          <br /> <span className="text-[#a855f7]">Solutions</span> Through <br />
          Purposeful <br />
          <span className="pl-[10vw]">Coding and Doing</span>
        </h1>
      </div>

      {/* Three.js 3D Network */}
      <div className="absolute right-[-10%] top-0 w-[55%] h-full z-0">
        <ThreeNetwork />
      </div>
    </section>
  );
};

export default Hero;
