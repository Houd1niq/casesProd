import { baseUrl, casesApi } from "./queryWithRefresh";

type Box = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};
type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type BoxItem = {
  id: number;
  drop_rate: number;
  item: Item;
};

export const adminApiSlice = casesApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<
      {
        id: string;
        name: string;
        email: string;
        balance: number;
        profit_multiplier: number;
      }[],
      void
    >({
      query: () => ({
        url: "admin/get-all-users",
        method: "GET",
      }),
    }),

    changeUser: build.mutation<
      void,
      { id: string; data: { balance: number; profitMultiplier: number } }
    >({
      query: (body) => ({
        url: "admin/change-user",
        method: "POST",
        body,
      }),
    }),

    getAllBoxes: build.query<Box[], void>({
      query: () => ({
        url: "admin/get-all-boxes",
        method: "GET",
      }),
      transformResponse: (response: Box[]) => {
        return response.map((box) => ({
          ...box,
          image: `${baseUrl}/${box.image}`,
        }));
      },
    }),

    changeDropRate: build.mutation<void, { id: number; dropRate: number }>({
      query: (body) => ({
        url: "admin/change-drop-rate",
        method: "POST",
        body,
      }),
    }),

    deleteBoxItem: build.mutation<void, number>({
      query: (id) => ({
        url: "admin/delete-case-item/" + id,
        method: "DELETE",
      }),
    }),

    addItemInBox: build.mutation<
      {},
      { caseId: number; itemId: number; dropRate: number }
    >({
      query: (body) => ({
        url: "admin/add-case-item",
        method: "POST",
        body,
      }),
    }),

    getItemsInBox: build.query<BoxItem[], number>({
      query: (caseId) => ({
        url: "admin/case-items/" + caseId,
        method: "GET",
      }),
      transformResponse: (response: BoxItem[]) => {
        return response.map((boxItem) => ({
          ...boxItem,
          item: {
            ...boxItem.item,
            image: `${baseUrl}/${boxItem.item.image}`,
          },
        }));
      },
    }),

    getAllItems: build.query<Item[], void>({
      query: () => ({
        url: "admin/get-all-items",
        method: "GET",
      }),
      transformResponse: (response: Item[]) => {
        return response.map((item) => ({
          ...item,
          image: `${baseUrl}/${item.image}`,
        }));
      },
    }),

    addItem: build.mutation({
      query: (formData) => ({
        url: "admin/add-item",
        method: "POST",
        body: formData,
      }),
    }),

    addBox: build.mutation({
      query: (formData) => ({
        url: "admin/add-box",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});
