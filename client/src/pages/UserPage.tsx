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

        <div className="flex flex-wrap justify-center max-w-[750px] text-white font-sf-ui gap-3 mb-5">
          {user && user.user_items && user.user_items.length > 0 ? (
            user.user_items.map((item, idx) => {
              return <ProfileItem key={`${item.id}-${idx}`} item={item} />;
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
