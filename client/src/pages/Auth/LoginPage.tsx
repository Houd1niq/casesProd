import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { authApiSlice } from "../../services/casesApi/authApiSlice";
import { triggerWarningNotification } from "../../utils/notificationUtilities";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginTrigger, loginResponse] = authApiSlice.useLoginMutation();

  async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.length < 3) {
      triggerWarningNotification("Email is not valid");
      return;
    }
    if (password.length < 4) {
      triggerWarningNotification("Password must be at least 4 characters long");
      return;
    }
    await loginTrigger({ email, password });
  }

  useEffect(() => {
    console.log(loginResponse);

    if (loginResponse.error && loginResponse.error) {
      const error = loginResponse.error as {
        data: { message: string; statusCode: number; error: string };
        status: number;
      };
      triggerWarningNotification(error.data.message);
    }
    if (loginResponse.isSuccess) {
      navigate("/", { replace: true });
    }
  }, [loginResponse]);

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-3xl text-white font-regular font-sf-ui mb-3 ">
        Sign in
      </h1>
      <form
        onSubmit={loginHandler}
        className="flex flex-col items-center text-white bg-bg-light pt-6 pb-7 px-10 rounded-2xl"
      >
        <div className="flex flex-col mt-3">
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
        <Link
          className="glowing-text text-white mt-2 hover:shadow-white"
          to="../signup"
        >
          Not registered yet? Register.
        </Link>
      </form>
    </div>
  );
};
