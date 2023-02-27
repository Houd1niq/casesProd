import React, { ChangeEvent, useEffect, useState } from "react";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { useAppSelector } from "../store/store";
import { ProfileHexagon } from "../components/ProfileHexagon";
import settings from "../assets/images/setting-icon.svg";

export const Settings = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [triggerSetImage, response] = userApiSlice.useSetProfileImageMutation();

  const user = useAppSelector((state) => state.userReducer.user);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  }

  useEffect(() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      triggerSetImage(formData);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (response.data) {
      window.location.reload();
    }
  }, [response]);

  return (
    <div className="flex flex-col text-white items-center font-sf-ui">
      <div className="mx-auto sm:mt-12 mt-5">
        {user && user.user_profile_image ? (
          <ProfileHexagon link={user.user_profile_image}></ProfileHexagon>
        ) : (
          <ProfileHexagon link=""></ProfileHexagon>
        )}
      </div>
      <input
        id="image"
        className="hidden"
        type="file"
        onChange={handleFileChange}
      />
      <label
        className="mx-auto cursor-pointer glowing-text mt-1 font-light underline"
        htmlFor="image"
      >
        edit pfp
      </label>
      <ul className="mt-2">
        <li className="flex items-center">
          <div className="flex ">
            <img
              src={settings}
              className="mr-1 cursor-pointer"
              alt="settings"
            />
            <span className="font-light">username:</span>
          </div>
          <span className="font-medium ml-6">{user && user.name}</span>
        </li>
        <li className="flex items-center">
          <div className="flex ">
            <img
              src={settings}
              className="mr-1 cursor-pointer"
              alt="settings"
            />
            <span className="font-light">email:</span>
          </div>
          <span className="font-medium ml-6">{user && user.email}</span>
        </li>
        <li className="flex items-center">
          <div className="flex ">
            <img
              src={settings}
              className="mr-1 cursor-pointer"
              alt="settings"
            />
            <span className="font-light">wallet:</span>
          </div>
          <span className="font-medium ml-6">
            {user && user.wallet ? user.wallet : "not linked"}
          </span>
        </li>
      </ul>
    </div>
  );
};
