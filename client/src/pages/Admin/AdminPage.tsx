import { OrangeButton } from "../../components/OrangeButton";
import { useAppDispatch } from "../../store/store";
import { adminLogout } from "../../store/slices/adminSlice";

export const AdminPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="text-white sf-ui flex flex-col p-10 items-center justify-center">
      <h1 className="text-2xl mb-3">Admin page</h1>
      <div className="flex flex-col gap-4">
        <OrangeButton isLink={{ to: "users" }}>Configure users</OrangeButton>
        <OrangeButton isLink={{ to: "items" }}>Configure items</OrangeButton>
        <OrangeButton isLink={{ to: "boxes" }}>Configure boxes</OrangeButton>
        <OrangeButton
          onClick={() => {
            dispatch(adminLogout());
          }}
        >
          Logout
        </OrangeButton>
      </div>
    </div>
  );
};
