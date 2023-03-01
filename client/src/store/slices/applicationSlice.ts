import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  usersCount: number;
  onlineUsersCount: number;
  boxesOpenedCount: number;
} = {
  usersCount: 0,
  onlineUsersCount: 0,
  boxesOpenedCount: 0,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setUsersCount(state, action: PayloadAction<number>) {
      state.usersCount = action.payload;
    },
    setOnlineUsersCount(state, action: PayloadAction<number>) {
      state.onlineUsersCount = action.payload;
    },
    setBoxesOpenedCount(state, action: PayloadAction<number>) {
      state.boxesOpenedCount = action.payload;
    },
  },
});

export const { setUsersCount, setOnlineUsersCount, setBoxesOpenedCount } =
  applicationSlice.actions;
export default applicationSlice.reducer;
