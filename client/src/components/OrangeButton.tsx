import React from "react";
import { Link } from "react-router-dom";

export const OrangeButton: React.FC<{
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (...args: any[]) => void;
  disabled?: boolean;
  isLink?: { to: string };
  className?: string;
}> = ({ children, isLink, onClick, type, className, disabled }) => {
  if (isLink) {
    return (
      <Link
        to={isLink.to}
        className={
          "block text-white orange-button px-7 py-1 rounded-[5px] font-regular font-sf-ui border border-yellow-300" +
          " " +
          (className || "")
        }
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "orange-button text-white px-7 py-1 rounded-[5px] font-regular font-sf-ui border border-yellow-300" +
        " " +
        (className || "")
      }
      type={type || "button"}
    >
      {children}
    </button>
  );
};
