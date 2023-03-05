import { DefaultInput } from "../../../components/DefaultInput";
import { OrangeButton } from "../../../components/OrangeButton";
import React from "react";

export const BoxAndItemForm: React.FC<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (name: string) => void;
  price: string;
  setPrice: (price: string) => void;
  setImage: (image: File | null) => void;
}> = ({ handleSubmit, name, setName, price, setPrice, setImage }) => {
  return (
    <form
      className="flex flex-col items-center gap-3 text-white"
      onSubmit={handleSubmit}
    >
      <DefaultInput
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        placeholder="Name"
      />
      <DefaultInput
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
        type="text"
        placeholder="Price"
      />
      <input
        onChange={(e) => setImage(e.target.files && e.target.files[0])}
        type="file"
      />
      <OrangeButton type="submit">Submit</OrangeButton>
    </form>
  );
};
