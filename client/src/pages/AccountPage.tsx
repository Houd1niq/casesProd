import React, { useEffect } from "react";
import { useAppSelector } from "../store/store";
import { ProfileHexagon } from "../components/ProfileHexagon";
import { ProfileItem } from "../components/ProfileItem";
import { Navigate } from "react-router-dom";
import discordLogo from "../assets/images/discord.svg";
import twitterLogo from "../assets/images/twitter.svg";
import { OrangeButton } from "../components/OrangeButton";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { triggerWarningNotification } from "../utils/notificationUtilities";

export const AccountPage: React.FC = () => {
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  if (!accessToken) {
    return <Navigate to={"/auth"} />;
  }

  const user = useAppSelector((state) => state.userReducer.user);
  const [checkIn, checkInResponse] = userApiSlice.useCheckInMutation();
  const [updateProfile] = userApiSlice.useLazyGetProfileInfoQuery();

  useEffect(() => {
    if (checkInResponse.isSuccess) {
      updateProfile("");
    }
    if (checkInResponse.isError) {
      const error = checkInResponse.error as {
        data: {
          message: string;
          statusCode: number;
          error: string;
        };
        status: number;
      };
      triggerWarningNotification(error.data.message);
    }
  }, [checkInResponse]);

  const filledDays: React.ReactNode[] = [];

  if (user) {
    for (let i = 0; i < user.dayStreak; i++) {
      filledDays.push(
        <li className="bg-main-yellow w-5 h-2.5 rounded-[2px]"></li>
      );
    }
    for (let i = 0; i < 7 - user.dayStreak; i++) {
      filledDays.push(
        <li className="bg-mini-profile-menu-bg w-5 h-2.5 rounded-[2px]"></li>
      );
    }
  }
  return (
    <div className="flex justify-center sf-ui text-white flex-col items-center sm:mt-12 mt-5">
      <div className="flex max-w-[750px] w-full justify-between">
        <div className="mr-10">
          <p className="text-[20px] text-center">time spent</p>
          <p className="font-bold text-[32px] text-center">
            {user ? Math.floor(user.minutesCounter / 60) : 0}h
          </p>
          <div className="flex gap-3 mt-14 ">
            <a href="#">
              <img src={twitterLogo} alt="discord" />
            </a>
            <a href="#">
              <img src={discordLogo} alt="discord" />
            </a>
          </div>
        </div>
        <ProfileHexagon
          link={user && user.profile_image ? user.profile_image : ""}
        />
        <div className="">
          <p className="text-[20px] text-center">cases opened</p>
          <p className="font-bold text-[32px] text-center">
            {user ? user.user_items.reduce((acc) => acc + 1, 0) : 0}
          </p>
          <div className="mt-10">
            <p className="font-light text-[13px] mb-1">
              {user ? user.dayStreak : 0}/7 days
            </p>
            <ul className="flex gap-x-0.5 border border-[1.5px] rounded-[3px] border-profile-bg">
              {filledDays}
            </ul>
            <div className="flex flex-col items-center">
              <OrangeButton
                onClick={() => {
                  checkIn();
                }}
                disabled={
                  !(user && user.dayStreak < 7 && user.isDayStreakActive)
                }
                className="mt-2.5"
              >
                check in!
              </OrangeButton>
              <p className="font-extralight text-[7px] max-w-[140px] mt-1">
                *The button will become active when buying any case. On day 7,
                you will receive a free case.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-[40px] font-medium">
        {user ? user.name : "Loading..."}
      </h2>

      <div className="flex flex-wrap justify-center relative min-w-[320px] max-w-[680px] text-white font-sf-ui gap-3 mb-5">
        {user && user.user_items && user.user_items.length > 0 && (
          <div className="left-corner -left-[25px]"></div>
        )}
        {user && user.user_items && user.user_items.length > 0 && (
          <div className="right-corner -right-[30px]"></div>
        )}
        {user && user.user_items && user.user_items.length > 0 ? (
          user.user_items.map((item) => {
            return <ProfileItem key={item.timestamp} item={item} />;
          })
        ) : (
          <div>no items</div>
        )}
      </div>
    </div>
  );
};
