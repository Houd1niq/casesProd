import React from "react";
import person from "../assets/images/person.png";

export const SmallHexagon: React.FC<{ link: string }> = ({ link }) => {
  console.log(link.split("/").at(-1) === "null");
  if (!link || link.split("/").at(-1) === "null") {
    return (
      <div className="hexagon-parent-small">
        <div className="hexagon-small2">
          <div className="hexagon-parent-small">
            <div className="hexagon-small">
              <div className="img bg-profile-bg relative">
                <img
                  src={person}
                  alt=""
                  className="absolute left-[50%] top-[50%] transform translate-x-[-50%] -translate-y-[50%] z-20 w-[25px] h-[25px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="hexagon-parent-small">
      <div className="hexagon-small2">
        <div className="hexagon-parent-small">
          <div className="hexagon-small">
            <div
              className="img"
              style={{
                backgroundImage: `url(${link})`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
