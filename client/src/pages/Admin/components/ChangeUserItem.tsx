import { OrangeButton } from "../../../components/OrangeButton";
import React, { useEffect } from "react";
import { adminApiSlice } from "../../../services/casesApi/adminApiSlice";
import { triggerWarningNotification } from "../../../utils/notificationUtilities";

export const ChangeUserItem: React.FC<{
  user: {
    id: string;
    name: string;
    email: string;
    balance: number;
    profit_multiplier: number;
  };
}> = ({ user }) => {
  const [balance, setBalance] = React.useState(user.balance);
  const [profitMultiplier, setProfitMultiplier] = React.useState(
    user.profit_multiplier
  );
  const [isChanging, setIsChanging] = React.useState(false);
  const [changeTrigger, changeResponse] = adminApiSlice.useChangeUserMutation();

  useEffect(() => {
    if (changeResponse.isError) {
      triggerWarningNotification("Something went wrong");
    }
    if (changeResponse.isSuccess) {
      window.location.reload();
    }
  }, [changeResponse]);

  function changeHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    changeTrigger({
      id: user.id,
      data: {
        balance,
        profitMultiplier: profitMultiplier,
      },
    });
  }

  return (
    <form
      onSubmit={changeHandler}
      className="flex gap-3 bg-profile-bg p-5 rounded-xl"
    >
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <div className="flex">
        <p className="text-green-500">
          Balance: {!isChanging && user.balance}{" "}
        </p>
        {isChanging && (
          <input
            className="bg-transparent border-b border-white outline-none h-6 ml-2 w-20"
            type="number"
            value={balance}
            onChange={(e) => {
              setBalance(Number(e.target.value));
            }}
          />
        )}
      </div>
      <p>Name: {user.name}</p>
      <div className="flex">
        <p className="text-green-500">
          Profit multiplier: {!isChanging && user.profit_multiplier}
        </p>
        {isChanging && (
          <input
            className="bg-transparent border-b border-white outline-none h-6 ml-2 w-20"
            type="number"
            value={profitMultiplier}
            onChange={(e) => {
              setProfitMultiplier(Number(e.target.value));
            }}
          />
        )}
      </div>
      {!isChanging && (
        <OrangeButton
          onClick={() => {
            setIsChanging((prevState) => !prevState);
          }}
        >
          Change
        </OrangeButton>
      )}
      {isChanging && <OrangeButton type="submit">Save</OrangeButton>}
    </form>
  );
};
