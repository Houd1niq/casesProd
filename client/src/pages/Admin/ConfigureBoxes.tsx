import React, { useEffect, useState } from "react";
import { adminApiSlice } from "../../services/casesApi/adminApiSlice";
import { BoxAndItemForm } from "./components/BoxAndItemForm";
import { BackButton } from "../../components/BackButton";
import { Link } from "react-router-dom";
import { triggerWarningNotification } from "../../utils/notificationUtilities";

export const ConfigureBoxes = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [addBoxTrigger, addBoxResponse] = adminApiSlice.useAddBoxMutation();
  const boxes = adminApiSlice.useGetAllBoxesQuery();

  useEffect(() => {
    if (boxes.isError) {
      const error = boxes.error as {
        data: { message: string; statusCode: number; error: string };
        status: number;
      };
      if (error.status === 403) {
        triggerWarningNotification(
          "Something went wrong, probably you authorized as user"
        );
      }
    }
  }, [boxes]);

  useEffect(() => {
    if (
      addBoxResponse.status === "fulfilled" ||
      addBoxResponse.status === "rejected"
    ) {
      setName("");
      setPrice("");
      setImage(null);
    }
  }, [addBoxResponse]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name && price && image) {
      console.log("here");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image);
      addBoxTrigger(formData);
    }
  }

  return (
    <div className="text-white font-sf-ui flex flex-col items-center">
      <h1 className="text-2xl text-center">Configure boxes</h1>
      <BoxAndItemForm
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        setImage={setImage}
      />
      <BackButton className="mt-3"></BackButton>
      {boxes.isSuccess && (
        <div className="flex flex-col sm:flex-row gap-3">
          {boxes.data.map((box) => (
            <Link to={`../box/${box.id}`} key={box.id}>
              <img className="w-[200px]" src={box.image} alt="" />
              <h2>Id: {box.id}</h2>
              <h2>Name: {box.name}</h2>
              <h2>Price: {box.price}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
