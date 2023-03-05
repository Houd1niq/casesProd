import { MiniProfileMenu } from "../components/MiniProfileMenu";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import React, { useContext, useEffect } from "react";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import logo from "../assets/images/Logo.png";
import { LastItemsList } from "../components/LastItemsList";
import {
  setBoxesOpenedCount,
  setOnlineUsersCount,
  setUsersCount,
} from "../store/slices/applicationSlice";
import { WebSocketContext } from "../services/SocketContext";

export const MainLayout = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const [triggerProfileInfoQuery] = userApiSlice.useLazyGetProfileInfoQuery();
  const socket = useContext(WebSocketContext);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user)
      setInterval(() => {
        socket.emit("minutePass", { userId: user.id });
      }, 60000);
  }, [user]);

  useEffect(() => {
    socket.on(
      "onConnect",
      (data: { boxesCount: number; usersCount: number }) => {
        dispatch(setBoxesOpenedCount(data.boxesCount));
        dispatch(setUsersCount(data.usersCount));
      }
    );

    socket.on("onOnlineUpdate", (data: { currentOnline: number }) => {
      dispatch(setOnlineUsersCount(data.currentOnline));
    });

    socket.on("boxOpened", (data: { countOfOpenedBoxes: number }) => {
      dispatch(setBoxesOpenedCount(data.countOfOpenedBoxes));
    });

    return () => {
      socket.off("onOnlineUpdate");
      socket.off("boxOpened");
      socket.off("onConnect");
    };
  }, []);

  useEffect(() => {
    if (accessToken) triggerProfileInfoQuery("");
  }, [accessToken]);

  return (
    <>
      <div className="App bg-repeat bg-background w-full min-h-[100vh] pb-[50px] relative">
        <header className="h-[60px] bg-bg-light">
          <div className="max-w-[800px] mx-auto flex items-center justify-between">
            <Link
              to="/"
              className="logo flex items-center font-garet font-bold text-[32px]"
            >
              LFC
              <img className="w-[60px]" src={logo} alt="logo"></img>
            </Link>
            <ul className="flex gap-[60px]">
              <li className="text-center hidden sm:block font-sf-ui font-light">
                <p className="text-text-gray text-[12px]">
                  LFC 24h volume
                  <br />
                  <span className="text-text-light text-[14px]">657 sol</span>
                </p>
              </li>

              <li className="text-center hidden sm:block font-sf-ui font-light">
                <p className="text-text-gray text-[12px]">
                  Solana Network
                  <br />
                  <span className="text-text-light text-[14px]">563 TPS</span>
                </p>
              </li>

              <li className="text-center hidden sm:block font-sf-ui font-light">
                <p className="text-text-gray text-[12px]">
                  SOL/USD
                  <br />
                  <span className="text-text-light text-[14px]">$23.29</span>
                </p>
              </li>
            </ul>
            <MiniProfileMenu></MiniProfileMenu>
          </div>
        </header>
        <LastItemsList></LastItemsList>
        <Outlet></Outlet>
        <footer className="bg-bg-light h-[50px] w-full bottom-0 absolute z-10"></footer>
      </div>
    </>
  );
};
