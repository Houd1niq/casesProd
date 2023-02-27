import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/auth" ||
      window.location.pathname === "/auth/"
    ) {
      navigate("login");
    }
  }, []);

  return (
    <div className="App bg-repeat bg-background w-full min-h-[100vh] flex items-center justify-center">
      <Outlet></Outlet>
    </div>
  );
};
