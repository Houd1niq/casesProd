import { adminApiSlice } from "../../services/casesApi/adminApiSlice";
import React, { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { ChangeUserItem } from "./components/ChangeUserItem";
import { triggerWarningNotification } from "../../utils/notificationUtilities";

export const ConfigureUsers = () => {
  const allUsers = adminApiSlice.useGetAllUsersQuery();
  const [name, setName] = useState("");

  useEffect(() => {
    if (allUsers.isError) {
      const error = allUsers.error as {
        data: { message: string; statusCode: number; error: string };
        status: number;
      };
      if (error.status === 403) {
        triggerWarningNotification(
          "Something went wrong, probably you authorized as user"
        );
      }
    }
  }, [allUsers]);

  return (
    <div className="font-sf-ui text-white flex flex-col items-center pt-3">
      <h2>Search by name</h2>
      <input
        className="bg-transparent mb-3 border-b border-white outline-none"
        placeholder="enter name here"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {allUsers.status === "pending" && <p>Loading...</p>}
      {allUsers.data
        ?.filter((item) => {
          if (name === "") {
            return item;
          } else if (item.name.toLowerCase().includes(name.toLowerCase())) {
            return item;
          }
        })
        .map((user) => (
          <ChangeUserItem user={user} key={user.id}></ChangeUserItem>
        ))}
      <BackButton className="mt-3"></BackButton>
    </div>
  );
};
