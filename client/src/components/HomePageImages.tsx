import React from "react";
import first from "../assets/homepageImages/1.png";
import second from "../assets/homepageImages/2.png";
import third from "../assets/homepageImages/3.png";
import fourth from "../assets/homepageImages/4.png";
import fifth from "../assets/homepageImages/5.png";

export const HomePageImages = () => {
  return (
    <div className="flex items-end relative mt-[30px]">
      <img
        className="w-[140px] h-[140px] relative left-[110px] hidden sm:block"
        src={first}
        alt="first"
      />
      <img
        className="w-[145px] h-[145px] relative left-[65px]"
        src={second}
        alt="second"
      />
      <img className="w-[180px] h-[180px]" src={third} alt="third" />
      <img
        className="w-[145px] h-[145px] relative right-[60px] z-20"
        src={fourth}
        alt="fourth"
      />
      <img
        className="w-[140px] h-[140px] relative right-[110px] hidden sm:block"
        src={fifth}
        alt="fith"
      />
    </div>
  );
};
