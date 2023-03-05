import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApiSlice } from "../../services/casesApi/authApiSlice";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [triggerLoginQuery, loginResponse] =
    authApiSlice.useAdminLoginMutation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginResponse.isSuccess && loginResponse.data) {
      navigate("/admin");
    }
  }, [loginResponse]);

  return (
    <div className="text-white flex pt-20 justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form");
          triggerLoginQuery({ name: login, password });
        }}
        className="flex flex-col items-center text-white bg-bg-light pt-6 pb-7 px-10 rounded-2xl"
      >
        <div className="flex flex-col mt-3">
          <label htmlFor="login">Login</label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Enter your login"
            className="outline-none py-1 px-2 bg-text-gray rounded-md mt-1"
            type="text"
            name="login"
            id="email"
          />
        </div>
        <div className="flex flex-col mt-3">
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
        <button
          className="orange-button px-4 py-1 mt-3 rounded-[5px] border border-yellow-300"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
