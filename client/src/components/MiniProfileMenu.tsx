import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Link } from "react-router-dom";
import { SmallHexagon } from "./SmallHexagon";
import { logOut } from "../store/slices/authSlice";

export const MiniProfileMenu: React.FC = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(logOut());
  }

  let content = <></>;

  // Logged in
  if (accessToken && accessToken.length > 0 && user) {
    content = (
      <div>
        <div className="font-medium text-[14px]">
          Balance: <span className="font-light">{user.balance}</span>
        </div>
        <div className="font-light text-[12px]">
          Wallet:{" "}
          {user.wallet
            ? user.wallet.slice(0, 4) + "..." + user.wallet.slice(-4)
            : "wallet is not linked"}
        </div>
      </div>
    );
  }

  // Loading
  if (accessToken && accessToken.length > 0 && !user) {
    content = <div className="font-sf-ui text-[14px]">Loading...</div>;
  }

  // Login
  if (!accessToken || accessToken.length === 0) {
    content = (
      <div className="flex items-center gap-3">
        <Link
          to="/auth"
          className="text-white text-[14px] font-medium font-sf-ui"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mini-profile-menu group flex flex-col relative transition-all">
      <div className="my-1 flex text-white font-sf-ui items-center gap-3 z-20">
        {content}
        {user && user.profile_image ? (
          <SmallHexagon link={user.profile_image}></SmallHexagon>
        ) : (
          <SmallHexagon link=""></SmallHexagon>
        )}
      </div>

      {accessToken && accessToken.length > 0 && user && (
        <div className="absolute w-[110%] group-hover:block transition-all hidden left-[-5%] rounded-xl border border-gray-700 pt-16 z-10 px-5 pb-4 bg-mini-profile-menu-bg">
          <ul className="font-sf-ui font-regular text-[13px] text-white flex flex-col items-end">
            <li>
              <Link className="glowing-text" to="/account">
                account
              </Link>
            </li>
            <li>
              <Link className="glowing-text" to="/settings">
                settings
              </Link>
            </li>
            <li>
              <Link className="glowing-text" to="/">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="glowing-text" to="/">
                support
              </Link>
            </li>
            <li>
              <Link className="glowing-text" to="/">
                about project
              </Link>
            </li>
            <li>
              <button className="glowing-text" onClick={logout}>
                sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
