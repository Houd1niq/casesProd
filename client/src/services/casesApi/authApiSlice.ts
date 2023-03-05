import { casesApi } from "./queryWithRefresh";

type AuthDto = {
  name: string;
  password: string;
};

type RegisterDto = {
  email: string;
  password: string;
  name: string;
};

type LoginDto = {
  email: string;
  password: string;
};

export const authApiSlice = casesApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),

    login: build.mutation<{ accessToken: string }, LoginDto>({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        body,
      }),
    }),

    register: build.mutation<{ accessToken: string }, RegisterDto>({
      query: (registerDto) => ({
        url: "auth/signup",
        method: "POST",
        body: registerDto,
      }),
    }),

    adminLogin: build.mutation<{ accessToken: string }, AuthDto>({
      query: (body) => ({
        url: "admin/signin",
        method: "POST",
        body,
      }),
    }),

    adminLogout: build.mutation({
      query: () => ({
        url: "admin/logout",
        method: "POST",
      }),
    }),

    confirmEmail: build.mutation<
      {
        isEmailConfirmed: boolean;
        message: string;
      },
      string
    >({
      query: (code: string) => ({
        url: `auth/confirm-email`,
        body: { code },
        method: "POST",
      }),
    }),
  }),
});
