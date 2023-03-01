import React, { useEffect, useState } from "react";
import { authApiSlice } from "../../services/casesApi/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  triggerSuccessNotification,
  triggerWarningNotification,
} from "../../utils/notificationUtilities";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const [registerTrigger, registerResponse] =
    authApiSlice.useRegisterMutation();

  async function registerHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.length < 3) {
      triggerWarningNotification("Email is not valid");
      return;
    }
    if (password.length < 4) {
      triggerWarningNotification("Password must be at least 4 characters long");
      return;
    }
    if (nickname.length < 4) {
      triggerWarningNotification("Nickname must be at least 4 characters long");
      return;
    }
    await registerTrigger({ email, password, name: nickname });
  }

  useEffect(() => {
    if (registerResponse.isSuccess) {
      triggerSuccessNotification("Check your email to confirm your account");
      navigate("../confirm-email");
    }
  }, [registerResponse]);

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-3xl text-white font-regular font-sf-ui mb-3 ">
        Sign up
      </h1>
      <form
        onSubmit={registerHandler}
        className="flex flex-col items-center text-white bg-bg-light pt-5 pb-7 px-10 rounded-2xl"
      >
        <div className="flex flex-col mt-2">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="outline-none py-1 px-2 bg-text-gray rounded-md mt-1"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="outline-none py-1 px-2 bg-text-gray rounded-md mt-1"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="nickname">Nickname</label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your nickname"
            className="outline-none py-1 px-2 bg-text-gray rounded-md mt-1"
            type="text"
            name="nickname"
            id="nickname"
          />
        </div>
        <button
          className="orange-button px-4 py-1 mt-3 rounded-[5px] border border-yellow-300"
          type="submit"
        >
          Sign up
        </button>
        <Link
          className="glowing-text text-white mt-2 hover:shadow-white"
          to="../login"
        >
          Already registered? Sign in.
        </Link>
      </form>
    </div>
  );
};
