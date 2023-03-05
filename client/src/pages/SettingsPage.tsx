import React, { ChangeEvent, useEffect, useState } from "react";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { useAppSelector } from "../store/store";
import { ProfileHexagon } from "../components/ProfileHexagon";
import { SettingsItem } from "../components/SettingsItem";
import settings from "../assets/images/setting-icon.svg";
import twitterLogo from "../assets/images/twitter.svg";
import discordLogo from "../assets/images/discord.svg";

export const SettingsPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [triggerSetImage, response] = userApiSlice.useSetProfileImageMutation();
  const [triggerChangeUsername, changeUsernameResponse] =
    userApiSlice.useChangeUsernameMutation();

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
        {user && user.profile_image ? (
          <ProfileHexagon link={user.profile_image}></ProfileHexagon>
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
        <SettingsItem
          parameter="username"
          value={user?.name || "Loading..."}
          handler={triggerChangeUsername}
          response={changeUsernameResponse}
        ></SettingsItem>
        <SettingsItem
          parameter="email"
          value={user?.email || "Loading..."}
          handler={() => {}}
          response={{
            isError: false,
            isLoading: false,
            isSuccess: false,
            status: "",
          }}
        ></SettingsItem>
        <SettingsItem
          parameter="wallet"
          value={user?.wallet || "wallet is not linked"}
          handler={() => {}}
          response={{
            isError: false,
            isLoading: false,
            isSuccess: false,
            status: "",
          }}
        ></SettingsItem>
      </ul>
      <div className="flex gap-5">
        <div className="flex mb-5 mt-5">
          <img alt="settings-icon" src={settings} />
          <a href="#">
            <img src={twitterLogo} alt="discord" />
          </a>
        </div>
        <div className="flex mb-5 mt-5">
          <img alt="settings-icon" src={settings} />
          <a href="#">
            <img src={discordLogo} alt="discord" />
          </a>
        </div>
      </div>
    </div>
  );
};
