import { OrangeButton } from "../../../components/OrangeButton";
import React, { useEffect, useState } from "react";
import {
  adminApiSlice,
  BoxItem,
} from "../../../services/casesApi/adminApiSlice";

export const ItemInBox: React.FC<{ boxItem: BoxItem }> = ({ boxItem }) => {
  const [isChange, setIsChange] = useState(false);
  const [changeDropRateTrigger, changeDropRateResponse] =
    adminApiSlice.useChangeDropRateMutation();
  const [deleteItemTrigger, deleteItemResponse] =
    adminApiSlice.useDeleteBoxItemMutation();
  const [dropRate, setDropRate] = useState("");

  useEffect(() => {
    if (changeDropRateResponse.status === "fulfilled") {
      window.location.reload();
    }

    if (deleteItemResponse.status === "fulfilled") {
      window.location.reload();
    }
  }, [changeDropRateResponse, deleteItemResponse]);

  return (
    <li className="w-[120px] flex flex-col" key={boxItem.item.id}>
      <img src={boxItem.item.image} alt="" />
      <h2 className="text-2xl">ID: {boxItem.item.id}</h2>
      <p>Name: {boxItem.item.name}</p>
      <p>Price: {boxItem.item.price}</p>
      <div className="flex mb-1">
        <p>Drop Rate: {!isChange ? boxItem.drop_rate : ""}</p>
        {isChange && (
          <input
            value={dropRate}
            onChange={(e) => {
              setDropRate(e.target.value);
            }}
            onBlur={() => {
              changeDropRateTrigger({
                id: boxItem.id,
                dropRate: Number(dropRate),
              });
              setIsChange((prevState) => !prevState);
            }}
            placeholder={`${boxItem.drop_rate}`}
            className="w-[40px] bg-background border-b border-white outline-none"
            type="text"
          />
        )}
      </div>
      <OrangeButton
        onClick={() => {
          setIsChange((prevState) => !prevState);
        }}
      >
        Change dropRate
      </OrangeButton>
      <OrangeButton
        className="mt-2"
        onClick={() => {
          deleteItemTrigger(boxItem.id);
        }}
      >
        Delete
      </OrangeButton>
    </li>
  );
};
