import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApiSlice } from "../../services/casesApi/authApiSlice";

interface AuthState {
  adminAccessToken: string | null;
}

const initialState: AuthState = {
  adminAccessToken: localStorage.getItem("adminAccessToken"),
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminToken(state, action: PayloadAction<string>) {
      state.adminAccessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },

    adminLogout(state) {
      state.adminAccessToken = null;
      localStorage.removeItem("adminAccessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.adminLogin.matchFulfilled,
      (state, action) => {
        state.adminAccessToken = action.payload.accessToken;
        localStorage.setItem("adminAccessToken", action.payload.accessToken);
      }
    );
  },
});

export const { setAdminToken, adminLogout } = AdminSlice.actions;
export default AdminSlice.reducer;
