import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { logOut, setAccessToken } from "../../store/slices/authSlice";

interface refreshResponse {
  data: {
    accessToken: string;
  };
}

let url = "http://localhost:3000";
if (import.meta.env.IS_PROD === true) {
  url = window.location.origin;
}

export const baseUrl = url;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.authReducer.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReFetch: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === "FETCH_ERROR")
    api.dispatch(logOut());
  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    )) as refreshResponse;
    if (refreshResult.data && refreshResult.data.accessToken) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken));
    } else {
      api.dispatch(logOut());
    }
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const casesApi = createApi({
  reducerPath: "casesApi",
  baseQuery: baseQueryWithReFetch,
  endpoints: () => ({}),
});
