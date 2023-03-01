import { useParams } from "react-router-dom";
import { boxesApiSlice } from "../services/casesApi/boxesApiSlice";
import { OrangeButton } from "../components/OrangeButton";
import { useContext, useEffect, useRef, useState } from "react";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { WebSocketContext } from "../services/SocketContext";
import { rollDuration } from "../constants/constant";
import { triggerWarningNotification } from "../utils/notificationUtilities";

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
}

export const BoxPage = () => {
  const [rollBoxTrigger, rollResponse] = boxesApiSlice.useLazyRollBoxQuery();
  const [updateProfileTrigger] = userApiSlice.useLazyGetProfileInfoQuery();
  const [itemsPool, setItemsPool] = useState<Item[]>([]);
  const { name } = useParams<{ name: string }>();
  const { currentData: boxes } = boxesApiSlice.useGetBoxesQuery("");
  const box = boxes?.find((box) => box.name === name);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const socket = useContext(WebSocketContext);
  const [randomOffset, setRandomOffset] = useState(0);

  function rollBoxHandler() {
    if (
      box &&
      box.CaseItem &&
      rollResponse.status !== "pending" &&
      !isScrolling
    ) {
      rollBoxTrigger(box.id);
    }
  }

  useEffect(() => {
    console.log(rollResponse);
    if (rollResponse.isError && rollResponse.error) {
      console.log("here");
      const error = rollResponse.error as {
        data: {
          message: string;
          statusCode: number;
          error: string;
        };
        status: number;
      };
      if (error.status === 400) {
        console.log("here2");
        triggerWarningNotification(error.data.message);
      }
    }

    if (rollResponse.isSuccess && rollResponse.status === "fulfilled") {
      socket.emit("boxOpened");
      console.log("here", rollResponse);
      let randomOffset: number = Math.floor(Math.random() * 85);
      const randomDirection = Math.floor(Math.random() * 2);
      if (randomDirection === 0) randomOffset -= randomOffset * 2;
      setRandomOffset(randomOffset);
      if (box && box.CaseItem) {
        const generatingItemsPool: Item[] = [];
        for (let i = 0; i < 100; i++) {
          if (i === 80) {
            const droppedItem = box.CaseItem.find(
              (item) => item.item.id === rollResponse.data.itemId
            );
            if (droppedItem) generatingItemsPool.push(droppedItem.item);
            continue;
          }
          const random = Math.random();
          let sum = 0;
          for (let j = 0; j < box.CaseItem.length; j++) {
            sum += box.CaseItem[j].drop_rate;
            if (random <= sum) {
              generatingItemsPool.push(box.CaseItem[j].item);
              break;
            }
          }
        }
        setItemsPool(generatingItemsPool);
        if (containerRef.current) {
          containerRef.current.classList.remove("animate-scroll");
          containerRef.current.style.transformStyle = "translateX(0px)";
          setTimeout(() => {
            containerRef.current?.classList.add("animate-scroll");
          }, 100);
        }
        setIsScrolling(true);
        setTimeout(() => {
          setIsScrolling(false);
        }, rollDuration);
      }
      updateProfileTrigger("");
    }
  }, [rollResponse]);

  return (
    <div className="flex flex-col items-center mt-11 font-sf-ui">
      <div className="bg-scroller-bg w-[80%] max-w-[1225px] border-x-[20px] border-transparent relative overflow-hidden p-5 h-[250px] flex items-center rounded-[10px]">
        {itemsPool.length > 0 && (
          <span className="absolute h-full w-[1px] border-l-2 left-[50%] border-orange-400 z-10"></span>
        )}
        {itemsPool.length > 0 && (
          <div
            ref={containerRef}
            style={{ marginLeft: `${randomOffset}px` }}
            className="flex gap-3 animate-scroll w-full relative"
          >
            {itemsPool.map((item, idx) => {
              return (
                <img
                  alt="item-image"
                  className="w-[200px] h-[200px] rounded-[9px]"
                  datatype={idx === 80 ? "dropped" : ""}
                  key={idx}
                  src={item.image}
                />
              );
            })}
          </div>
        )}
        <div className="w-full flex justify-center">
          {box && itemsPool.length === 0 && (
            <img
              alt="box-image"
              className="w-[270px] h-[270px] rounded-[10px]"
              src={box?.image}
            />
          )}
        </div>
      </div>

      <OrangeButton className="mt-3" onClick={rollBoxHandler}>
        {box ? box.price : "loading..."} SOL
      </OrangeButton>
      <h3 className="text-[16px] text-white mt-0.5 font-light pb-4">
        {box ? box.name : "loading.."}
      </h3>
      <div className="items-wrapper text-white  flex gap-5 flex-wrap max-w-[700px] mb-4 justify-center">
        {box &&
          box.CaseItem &&
          box.CaseItem.map((caseItem) => {
            let item = caseItem.item;
            return (
              <div
                key={item.image}
                className="bg-nft-bg flex flex-col items-center p-4 rounded-[9px] text-[20px]"
              >
                <img
                  alt="item-image"
                  className="w-[125px] h-[125px] rounded-[6px]"
                  src={item.image}
                />
                <p className="font-medium mt-1">{item.name}</p>
                <p className="font-light">{item.price} SOL</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
