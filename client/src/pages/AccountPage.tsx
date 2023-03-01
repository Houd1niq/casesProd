import React from "react";
import { useAppSelector } from "../store/store";
import { ProfileHexagon } from "../components/ProfileHexagon";
import { ProfileItem } from "../components/ProfileItem";

export const AccountPage: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.user);
  return (
    <div className="flex justify-center sf-ui text-white flex-col items-center sm:mt-12 mt-5">
      <div className="flex ">
        <div className="mr-20">
          <p className="text-[20px]">time spent</p>
          <p className="font-bold text-[32px]">
            {user ? Math.floor(user.minutesCounter / 60) : 0}h
          </p>
        </div>
        <ProfileHexagon
          link={user && user.profile_image ? user.profile_image : ""}
        />
        <div className="ml-20">
          <p className="text-[20px]">time spent</p>
          <p className="font-bold text-[32px]">
            {user ? Math.floor(user.minutesCounter / 60) : 0}h
          </p>
        </div>
      </div>

      <h2 className="text-[40px] font-medium">
        {user ? user.name : "Loading..."}
      </h2>

      <div className="flex flex-wrap justify-center max-w-[750px] text-white font-sf-ui gap-3 mb-5">
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
