import { createSlice } from "@reduxjs/toolkit";
import { User, userApiSlice } from "../../services/casesApi/userApiSlice";
import { baseUrl } from "../../services/casesApi/queryWithRefresh";
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
        if (action.payload.user_profile_image) {
          state.user.user_profile_image =
            baseUrl + "/" + action.payload.user_profile_image;
        }
      }
    );
  },
});

export default userSlice.reducer;
