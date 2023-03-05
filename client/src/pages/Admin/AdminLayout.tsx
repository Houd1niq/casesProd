import { useAppSelector } from "../../store/store";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AdminLayout = () => {
  const navigate = useNavigate();

  const adminAccessToken = useAppSelector(
    (state) => state.adminReducer.adminAccessToken
  );

  useEffect(() => {
    let decode: { role: string | null } = { role: null };
    try {
      decode = jwtDecode(adminAccessToken || "");
    } catch (e) {
      console.log(e);
    }
    console.log(decode, adminAccessToken);
    if (!adminAccessToken || !decode.role || decode.role !== "admin") {
      console.log("adminAccessToken", adminAccessToken, "decode", decode);
      navigate("login");
    }
  }, [adminAccessToken]);

  return (
    <div className="App bg-repeat bg-background w-full min-h-[100vh] pb-[50px] relative">
      <Outlet></Outlet>;
    </div>
  );
};
