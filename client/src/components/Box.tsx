import React from "react";
import { IBox } from "../services/casesApi/boxesApiSlice";
import { OrangeButton } from "./OrangeButton";

export const Box: React.FC<{ box: IBox }> = ({ box }) => {
  return (
    <div className=" border border-transparent flex flex-col items-center mt-8 hover:border-orange-300 rounded-[9px]">
      <img className="w-[220px] h-[220px]" alt="box-image" src={box.image} />
      <OrangeButton isLink={{ to: `box/${box.name}` }} className="-mt-1">
        {box.price} SOL
      </OrangeButton>
      <h3 className="text-[16px] mt-1 font-light pb-4">{box.name}</h3>
    </div>
  );
};
