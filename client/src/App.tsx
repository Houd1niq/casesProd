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
import { SettingsPage } from "./pages/SettingsPage";
import { BoxPage } from "./pages/BoxPage";
import { AccountPage } from "./pages/AccountPage";
import { socket, WebSocketProvider } from "./services/SocketContext";
import { UserPage } from "./pages/UserPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import { AdminLayout } from "./pages/Admin/AdminLayout";
import { AdminLoginPage } from "./pages/Admin/AdminLoginPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { ConfigureUsers } from "./pages/Admin/ConfigureUsers";
import { ConfigureItems } from "./pages/Admin/ConfigureItems";
import { ConfigureBoxes } from "./pages/Admin/ConfigureBoxes";
import { ConfigureBoxPage } from "./pages/Admin/ConfigureBoxPage";
function App() {
  return (
    <WebSocketProvider value={socket}>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="" element={<MainLayout></MainLayout>}>
            <Route path="" element={<Homepage></Homepage>}></Route>
            <Route path="case" element={<CasePage></CasePage>}></Route>
            <Route
              path="settings"
              element={<SettingsPage></SettingsPage>}
            ></Route>
            <Route path="box/:name" element={<BoxPage></BoxPage>}></Route>
            <Route path="user/:id" element={<UserPage></UserPage>}></Route>
            <Route path="account" element={<AccountPage></AccountPage>}></Route>
          </Route>

          <Route path="/auth" element={<AuthLayout></AuthLayout>}>
            <Route path="login" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="confirm-email"
              element={<ConfirmEmail></ConfirmEmail>}
            ></Route>
            <Route
              path="signup"
              element={<RegisterPage></RegisterPage>}
            ></Route>
          </Route>

          <Route path="admin" element={<AdminLayout></AdminLayout>}>
            <Route path="" element={<AdminPage></AdminPage>}></Route>
            <Route
              path="login"
              element={<AdminLoginPage></AdminLoginPage>}
            ></Route>
            <Route
              path="box/:boxId"
              element={<ConfigureBoxPage></ConfigureBoxPage>}
            ></Route>
            <Route
              path="users"
              element={<ConfigureUsers></ConfigureUsers>}
            ></Route>
            <Route
              path="items"
              element={<ConfigureItems></ConfigureItems>}
            ></Route>
            <Route
              path="boxes"
              element={<ConfigureBoxes></ConfigureBoxes>}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
