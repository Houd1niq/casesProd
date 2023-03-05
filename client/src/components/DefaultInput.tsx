import React from "react";

export const DefaultInput: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  className?: string;
}> = ({ value, onChange, placeholder, type = "text", name, id, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={
        "outline-none py-1 px-2 bg-text-gray rounded-md mt-1" + " " + className
      }
      type={type}
      name={name}
      id={id}
    />
  );
};
