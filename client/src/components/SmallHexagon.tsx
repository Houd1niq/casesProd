import React from "react";
import person from "../assets/images/person.png";

export const SmallHexagon: React.FC<{ link: string }> = ({ link }) => {
  if (!link) {
    return (
      <div className="hexagon-small2">
        <div className="hexagon-small">
          <div className="img bg-profile-bg relative">
            <img
              src={person}
              alt=""
              className="absolute left-[50%] top-[50%] transform translate-x-[-60%] -translate-y-[55%] z-20 w-[30px] h-[30px]"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="hexagon-small2">
      <div className="hexagon-small">
        <div
          className="img"
          style={{
            backgroundImage: `url(${link})`,
          }}
        ></div>
      </div>
    </div>
  );
};
