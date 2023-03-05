import { useParams } from "react-router-dom";
import { adminApiSlice } from "../../services/casesApi/adminApiSlice";
import { useEffect, useState } from "react";
import { DefaultInput } from "../../components/DefaultInput";
import { OrangeButton } from "../../components/OrangeButton";
import { BackButton } from "../../components/BackButton";
import { ItemInBox } from "./components/ItemInBox";
import { triggerWarningNotification } from "../../utils/notificationUtilities";

export const ConfigureBoxPage = () => {
  const boxId = useParams<{ boxId: string }>().boxId;
  const allItems = adminApiSlice.useGetAllItemsQuery();
  const [boxItemsTrigger, boxItemsResponse] =
    adminApiSlice.useLazyGetItemsInBoxQuery();
  const [inputIdValue, setInputIdValue] = useState("");
  const [inputDropRateValue, setInputDropRateValue] = useState("");
  const [addItemTrigger, addItemResponse] =
    adminApiSlice.useAddItemInBoxMutation();
  const totalDropRate =
    boxItemsResponse.data?.reduce((acc, item) => acc + item.drop_rate, 0) || 0;

  useEffect(() => {
    if (allItems.isError) {
      const error = allItems.error as {
        data: { message: string; statusCode: number; error: string };
        status: number;
      };
      if (error.status === 403) {
        triggerWarningNotification(
          "Something went wrong, probably you authorized as user"
        );
      }
    }
  }, [allItems]);

  useEffect(() => {
    if (addItemResponse.status === "fulfilled") {
      // reload window
      window.location.reload();
    }
  }, [addItemResponse]);

  function addItem() {
    if (inputIdValue && inputDropRateValue) {
      addItemTrigger({
        caseId: Number(boxId),
        itemId: Number(inputIdValue),
        dropRate: Number.parseFloat(inputDropRateValue),
      });
    }
  }

  useEffect(() => {
    if (boxId) boxItemsTrigger(Number(boxId));
  }, [boxId]);

  console.log(boxItemsResponse);

  return (
    <div className="text-white flex flex-col items-center">
      <h1 className="text-2xl">Box ID: {boxId}</h1>
      <BackButton></BackButton>
      <h2 className="text-2xl mt-10">AddItem</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
        className="flex flex-col gap-3"
      >
        <DefaultInput
          value={inputIdValue}
          onChange={(e) => {
            setInputIdValue(e.target.value);
          }}
          type="text"
          placeholder="Item ID"
        />
        <DefaultInput
          value={inputDropRateValue}
          onChange={(e) => {
            setInputDropRateValue(e.target.value);
          }}
          type="text"
          placeholder="Drop rate"
        ></DefaultInput>
        <OrangeButton type="submit">Add</OrangeButton>
      </form>

      <h2 className="text-2xl mt-10">Items, that already in box</h2>
      <ul className="flex flex-wrap gap-4 justify-center mt-1">
        {boxItemsResponse.isSuccess &&
          boxItemsResponse.data.map((boxItem) => (
            <ItemInBox boxItem={boxItem} key={boxItem.item.id} />
          ))}
      </ul>
      <p
        className={
          "text-3xl mt-3" +
          (totalDropRate === 1 ? " text-green-400" : " text-red-400")
        }
      >
        Total drop rate: {totalDropRate}
      </p>

      <h2 className="text-2xl mt-10 mb-4">all Items</h2>
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
