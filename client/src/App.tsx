import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { MainLayout } from "./layouts/MainLayout";
import { Homepage } from "./pages/Homepage";
import { CasePage } from "./pages/CasePage";
import { AuthLayout } from "./pages/Auth/AuthLayout";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { ConfirmEmail } from "./pages/Auth/ConfirmEmail";
import { Settings } from "./pages/Settings";
import { BoxPage } from "./pages/BoxPage";
import { AccountPage } from "./pages/AccountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout></MainLayout>}>
          <Route path="" element={<Homepage></Homepage>}></Route>
          <Route path="case" element={<CasePage></CasePage>}></Route>
          <Route path="settings" element={<Settings></Settings>}></Route>
          <Route path="box/:name" element={<BoxPage></BoxPage>}></Route>
          <Route path="account" element={<AccountPage></AccountPage>}></Route>
        </Route>
        <Route path="/auth" element={<AuthLayout></AuthLayout>}>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="confirm-email"
            element={<ConfirmEmail></ConfirmEmail>}
          ></Route>
          <Route path="signup" element={<RegisterPage></RegisterPage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
