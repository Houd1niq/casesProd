import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice";
import applicationReducer from "./slices/applicationSlice";
import { casesApi } from "../services/casesApi/queryWithRefresh";

const store = configureStore({
  reducer: {
    authReducer,
    applicationReducer,
    userReducer,
    [casesApi.reducerPath]: casesApi.reducer,
    adminReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(casesApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
