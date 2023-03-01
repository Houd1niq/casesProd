import settings from "../assets/images/setting-icon.svg";
import React, { useEffect } from "react";
import { userApiSlice } from "../services/casesApi/userApiSlice";
import { OrangeButton } from "./OrangeButton";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../utils/notificationUtilities";

type SettingsResponse = {
  isLoading: boolean;
  error?: any;
  isSuccess: boolean;
  isError: boolean;
  status: string;
};

export const SettingsItem: React.FC<{
  parameter: string;
  value: string;
  handler: (value: any) => void;
  type?: "text" | "password" | "email";
  response: SettingsResponse;
}> = ({ parameter, value, handler, response, type = "text" }) => {
  const [isChanging, setIsChanging] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [updateProfileTrigger] = userApiSlice.useLazyGetProfileInfoQuery();
  useEffect(() => {
    if (response.isError && response.error) {
      const error = response.error as {
        data: {
          message: string;
          statusCode: number;
          error: string;
        };
        status: number;
      };
      if (error.status === 400) {
        triggerWarningNotification(error.data.message);
      }
    }

    if (response.isSuccess && response.status === "fulfilled") {
      updateProfileTrigger("");
      triggerSuccessNotification("Profile updated successfully");
    }
  }, [response]);
  console.log(inputValue);

  return (
    <li className="flex items-center">
      <div className="flex ">
        <img
          onClick={() => {
            setIsChanging((prevState) => !prevState);
          }}
          src={settings}
          className="mr-1 cursor-pointer"
          alt="settings"
        />
        <span className="font-light">{parameter}:</span>
        {isChanging && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue.length < 4) {
                triggerWarningNotification(
                  "Value must be at least 4 characters long"
                );
                return;
              }
              handler(inputValue);
              setInputValue("");
              setIsChanging(false);
            }}
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={value}
              className="bg-transparent border-b border-white text-white font-light ml-5 outline-none"
              type={type}
            ></input>
            <OrangeButton type="submit" className="ml-4">
              Submit
            </OrangeButton>
          </form>
        )}
      </div>
      {!isChanging && <span className="font-medium ml-6">{value}</span>}
    </li>
  );
};
