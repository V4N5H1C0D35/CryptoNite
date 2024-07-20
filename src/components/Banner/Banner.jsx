import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div
      className="h-96 pt-14 BG bg-cover bg-center"
      style={{ backgroundImage: "url(banner.jpg)" }}
    >
      <div className="text-[#eebc1d] text-4xl md:text-6xl font-bold flex justify-center pt-4 tracking-widest">
        CRYPTO NITE
      </div>
      <div className="text-white flex justify-center mt-2 md:mt-4 text-base md:text-lg">
        Stay Ahead, Watch Crypto Unfold
      </div>
      <Carousel />
    </div>
  );
};

export default Banner;
