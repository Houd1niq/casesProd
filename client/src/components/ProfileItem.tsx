import React from "react";

interface ItemInterface {
  id: number;
  name: string;
  image: string;
  price: number;
}

export const ProfileItem: React.FC<{ item: ItemInterface }> = ({ item }) => {
  const [isSold, setIsSold] = React.useState(false);
  const [isObtained, setIsObtained] = React.useState(false);
  const actionClass = isObtained || isSold ? "opacity-10" : "opacity-100";

  return (
    <div
      key={item.image}
      className="bg-nft-bg flex group flex-col items-center relative p-4 rounded-[9px] mt-5 text-[20px]"
    >
      <img
        alt="item-image"
        className={
          "w-[125px] group-hover:opacity-10 transition-all h-[125px] rounded-[6px]" +
          " " +
          actionClass
        }
        src={item.image}
      />
      <p
        className={
          "font-medium group-hover:opacity-10 transition-all mt-1" +
          " " +
          actionClass
        }
      >
        {item.name}
      </p>
      {isObtained && <p className="font-bold text-main-yellow">OBTAINED</p>}
      {isSold && <p className="font-bold text-main-red">SOLD</p>}
      {!isObtained && !isSold && (
        <p className="font-light">price: {item.price} SOL</p>
      )}
      {!isObtained && !isSold && (
        <button
          onClick={() => {
            setIsObtained(true);
          }}
          className="hidden group-hover:block absolute top-[57%] transition-all bg-main-yellow w-[140px] h-10 rounded-[6px]"
        >
          get
        </button>
      )}
      {!isObtained && !isSold && (
        <button
          onClick={() => {
            setIsSold(true);
          }}
          className="hidden group-hover:block absolute top-[75%] transition-all bg-main-red w-[140px] h-10 rounded-[6px] mt-1.5"
        >
          sell
        </button>
      )}
    </div>
  );
};
