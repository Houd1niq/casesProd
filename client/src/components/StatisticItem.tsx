import React from "react";

export const StatisticItem: React.FC<{
  image: string;
  name: string;
  value: number | string;
}> = ({ image, value, name }) => {
  return (
    <div className="flex items-center w-[100px] justify-between">
      <img className="w-[29px] h-[25px]" src={image} alt="img" />
      <div className="text-end">
        <p className="block gradient-text font-medium text-[14px]">{name}</p>
        <p className="text-white -mt-1 text-[11px] font-light">{value}</p>
      </div>
    </div>
  );
};
