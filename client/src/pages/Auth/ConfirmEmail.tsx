import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { authApiSlice } from "../../services/casesApi/authApiSlice";

export const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [confirmEmailTrigger, response] =
    authApiSlice.useConfirmEmailMutation();

  async function confirmEmailHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await confirmEmailTrigger(code);
  }

  useEffect(() => {
    if (response.isSuccess) {
      navigate("/", { replace: true });
    }
  }, [response]);

  return (
    <div className="flex flex-col items-center bg-bg-light p-7 rounded-2xl justify-center">
      <div className="text-4xl font-sf-ui font-bold text-white mt-4">
        Verify your email
      </div>
      <div className=" font-sf-ui font-regular text-lg text-white mt-2">
        Open your email and enter the code from the email
      </div>
      <form
        onSubmit={confirmEmailHandler}
        className="text-white flex flex-col mt-2 items-center"
      >
        <label className="font-bold font-sf-ui text-2xl mb-1" htmlFor="code">
          Code
        </label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code"
          className=" bg-text-gray outline-none px-4 py-1.5 text-2xl rounded-xl"
          type="text"
        />
        <button
          type="submit"
          className="orange-button outline-none hover:scale-[1.02] hover:transition-all px-4 py-1 mt-4 rounded-[5px] border border-yellow-300 "
        >
          Submit
        </button>
        <Link to="/" className="glowing-text text-white mt-2">
          Return to homepage
        </Link>
      </form>
    </div>
  );
};
