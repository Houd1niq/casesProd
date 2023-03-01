import { baseUrl, casesApi } from "./queryWithRefresh";

export interface PublicUserInfo {
  id: string;
  name: string;
  profile_image: string | null;
  user_items: {
    id: number;
    name: string;
    image: string;
    price: number;
  }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  isEmailConfirmed: boolean;
  balance: number;
  wallet: string | null;
  user_cases: [];
  minutesCounter: number;
  dayStrak: number;
  user_items: {
    id: number;
    timestamp: string;
    name: string;
    image: string;
    price: number;
  }[];
  profile_image: string | null;
}

export const userApiSlice = casesApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileInfo: build.query<User, string>({
      query: () => ({
        url: "user/profile",
      }),
      transformResponse: (response: User) => {
        return {
          ...response,
          user_items: response.user_items.map((item) => ({
            ...item,
            image: `${baseUrl}/${item.image}`,
          })),
          profile_image: `${baseUrl}/${response.profile_image}`,
        };
      },
    }),
    getUserCount: build.query<{ usersCount: number }, void>({
      query: () => ({
        url: "user/get-count",
      }),
    }),

    getUser: build.query<PublicUserInfo, string>({
      query: (id) => ({
        url: `user/user/${id}`,
      }),
      transformResponse: (response: PublicUserInfo) => {
        return {
          ...response,
          user_items: response.user_items.map((item) => ({
            ...item,
            image: `${baseUrl}/${item.image}`,
          })),
          profile_image: `${baseUrl}/${response.profile_image}`,
        };
      },
    }),

    setProfileImage: build.mutation<{}, FormData>({
      query: (formData) => ({
        url: "user/upload-profile-image",
        method: "POST",
        body: formData,
      }),
    }),
    changeUsername: build.mutation<{}, string>({
      query: (body) => ({
        url: "user/change-username",
        method: "POST",
        body: { username: body },
      }),
    }),
  }),
});
