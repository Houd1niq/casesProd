import { MiniProfileMenu } from "../components/MiniProfileMenu";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import logo from "../assets/images/Logo.png";

export const MainLayout = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const [triggerProfileInfoQuery] = userApiSlice.useLazyGetProfileInfoQuery();

  useEffect(() => {
    if (accessToken) triggerProfileInfoQuery("");
  }, [accessToken]);

  return (
    <div className="App bg-repeat bg-background w-full min-h-[100vh] pb-[50px] relative">
      <header className="h-[60px] bg-bg-light">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <div className="flex">
            <Link
              to="/"
              className="logo pt-1.5 font-garet font-bold text-[32px]"
            >
              LFC
            </Link>
            <img className="w-[60px]" src={logo} alt="logo"></img>
          </div>
          <ul className="flex gap-[60px]">
            <li className="text-center font-sf-ui font-light">
              <p className="text-text-gray text-[12px]">
                LFC 24h volume
                <br />
                <span className="text-text-light text-[14px]">657 sol</span>
              </p>
            </li>

            <li className="text-center font-sf-ui font-light">
              <p className="text-text-gray text-[12px]">
                Solana Network
                <br />
                <span className="text-text-light text-[14px]">563 TPS</span>
              </p>
            </li>

            <li className="text-center font-sf-ui font-light">
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
      <Outlet></Outlet>
      <footer className="bg-bg-light h-[50px] w-full bottom-0 absolute z-10"></footer>
    </div>
  );
};
