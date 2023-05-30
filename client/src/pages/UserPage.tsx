import React from "react";
import { useParams } from "react-router-dom";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { ProfileHexagon } from "../components/ProfileHexagon";
import { ProfileItem } from "../components/ProfileItem";

export const UserPage: React.FC = () => {
  const userId = useParams().id;

  if (!userId) return <div>Nothing here</div>;
  const userInfo = userApiSlice.useGetUserQuery(userId);

  if (userInfo.data) {
    const user = userInfo.data;
    return (
      <div className="flex justify-center text-white flex-col items-center sm:mt-12 mt-5">
        <ProfileHexagon
          link={user && user.profile_image ? user.profile_image : ""}
        />

        <h2 className="text-[40px] font-medium">
          {user ? user.name : "Loading..."}
        </h2>

        <div className="flex flex-wrap justify-center min-w-[320px] max-w-[680px] text-white font-sf-ui gap-3 mb-5 relative">
          {user && user.user_items && user.user_items.length > 0 && (
            <div className="left-corner -left-[25px]"></div>
          )}
          {user && user.user_items && user.user_items.length > 0 && (
            <div className="right-corner -right-[30px]"></div>
          )}
          {user && user.user_items && user.user_items.length > 0 ? (
            user.user_items.map((item, idx) => {
              return (
                <div
                  key={item.image}
                  className="bg-nft-bg flex flex-col items-center relative p-4 rounded-[9px] mt-5 text-[20px]"
                >
                  <img
                    alt="item-image"
                    className="w-[125px] transition-all h-[125px] rounded-[6px]"
                    src={item.image}
                  />
                  <p className="font-medium transition-all mt-1">{item.name}</p>
                </div>
              );
            })
          ) : (
            <div>no items</div>
          )}
        </div>
      </div>
    );
  }
  return (
    <h2 className="text-4xl text-center font-bold text-white font-sf-ui mt-10">
      User not found
    </h2>
  );
};
