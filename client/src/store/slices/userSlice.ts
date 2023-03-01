import { createSlice } from "@reduxjs/toolkit";
import { User, userApiSlice } from "../../services/casesApi/userApiSlice";
import { logOut } from "./authSlice";

const initialState: { user: null | User } = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state) => {
      state.user = null;
    });
    builder.addMatcher(
      userApiSlice.endpoints.getProfileInfo.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
