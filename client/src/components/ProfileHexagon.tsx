import React from "react";
import person from "../assets/images/person.png";

export const ProfileHexagon: React.FC<{ link: string }> = ({ link }) => {
  if (!link) {
    return (
      <div className="hexagon2">
        <div className="hexagon">
          <div className="img bg-profile-bg relative">
            <img
              src={person}
              alt=""
              className="absolute left-[50%] top-[50%] transform translate-x-[-50%] -translate-y-[55%] z-20 w-[100px] h-[100px]"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="hexagon2">
      <div className="hexagon">
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
