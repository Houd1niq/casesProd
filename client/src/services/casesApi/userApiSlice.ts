import { casesApi } from "./queryWithRefresh";

export interface User {
  id: string;
  email: string;
  name: string;
  isEmailConfirmed: boolean;
  balance: number;
  wallet: string | null;
  user_cases: [];
  user_items: [];
  user_profile_image: string | null;
}

export const userApiSlice = casesApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileInfo: build.query<User, string>({
      query: () => ({
        url: "user/profile",
      }),
    }),

    setProfileImage: build.mutation<{}, FormData>({
      query: (formData) => ({
        url: "user/upload-profile-image",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
