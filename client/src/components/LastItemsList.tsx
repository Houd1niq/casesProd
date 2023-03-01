import React, { useContext, useEffect, useState } from "react";
import {
  boxesApiSlice,
  LastOpenedBox,
} from "../services/casesApi/boxesApiSlice";
import { WebSocketContext } from "../services/SocketContext";
import { baseUrl } from "../services/casesApi/queryWithRefresh";
import { rollDuration } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

export const LastItemsList: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  const [lastItemsTrigger, lastItemsResponse] =
    boxesApiSlice.useLazyGetLastBoxesQuery();
  const socket = useContext(WebSocketContext);
  const [lastItems, setLastItems] = useState<LastOpenedBox[]>([]);
  const navigate = useNavigate();

  function updateState(data: {
    lastBox: LastOpenedBox;
    countOfOpenedBoxes: number;
  }) {
    setTimeout(() => {
      setLastItems((prevState) => {
        return [data.lastBox, ...prevState.slice(0, 19)];
      });
    }, rollDuration);
  }

  useEffect(() => {
    if (
      lastItemsResponse.isSuccess &&
      lastItemsResponse.status === "fulfilled"
    ) {
      setLastItems(lastItemsResponse.data);
    }
  }, [lastItemsResponse]);

  useEffect(() => {
    lastItemsTrigger();
    socket.on(
      "boxOpened",
      (data: { lastBox: LastOpenedBox; countOfOpenedBoxes: number }) => {
        updateState(data);
      }
    );

    return () => {
      socket.off("boxOpened");
    };
  }, []);

  return (
    <div className="h-[115px] w-full bg-scroller-bg flex py-4 px-20 overflow-hidden gap-4 flex-wrap items-center justify-center">
      {lastItems &&
        lastItems.map((lastOpenedBox) => {
          return (
            <div className="group relative " key={lastOpenedBox.timestamp}>
              <img
                onClick={() => {
                  if (user && user.id === lastOpenedBox.user.id) {
                    navigate("/account");
                    return;
                  }
                  navigate("/user/" + lastOpenedBox.user.id);
                }}
                className="group-hover:opacity-[0.08] transition-all cursor-pointer w-[80px] h-[80px] rounded-[6px] mb-10"
                alt="item-image"
                src={baseUrl + "/" + lastOpenedBox.item.image}
              ></img>
              <p className="hidden whitespace-nowrap group-hover:block absolute top-[50%] left-[50%] w-auto transform -translate-x-1/2 text-[10px] font-light text-white ">
                id: {lastOpenedBox.user.id}
              </p>
            </div>
          );
        })}
    </div>
  );
};
