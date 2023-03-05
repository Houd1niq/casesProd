import React, { useEffect, useState } from "react";
import { adminApiSlice } from "../../services/casesApi/adminApiSlice";
import { BoxAndItemForm } from "./components/BoxAndItemForm";
import { BackButton } from "../../components/BackButton";

export const ConfigureItems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const allItems = adminApiSlice.useGetAllItemsQuery();
  const [addItemsTrigger, addItemsResponse] =
    adminApiSlice.useAddItemMutation();

  console.log("item page");

  useEffect(() => {
    if (
      addItemsResponse.status === "fulfilled" ||
      addItemsResponse.status === "rejected"
    ) {
      window.location.reload();
      setName("");
      setPrice("");
      setImage(null);
    }
  }, [addItemsResponse]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("here22");
    if (name && price && image) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      addItemsTrigger(formData);
    }
  }

  return (
    <div className="flex flex-col items-center text-white font-sf-ui">
      <h1 className="text-2xl">Configure items</h1>
      <BoxAndItemForm
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        setImage={setImage}
      />
      <BackButton className="mt-3"></BackButton>
      <h2 className="text-2xl mt-4">All items</h2>
      <ul className="flex flex-wrap gap-4 justify-center">
        {allItems.isSuccess &&
          allItems.data.map((item) => (
            <li className="w-[120px]" key={item.id}>
              <img src={item.image} alt="" />
              <h2 className="text-2xl">ID: {item.id}</h2>
              <p>Name: {item.name}</p>
              <p>Price: {item.price}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
