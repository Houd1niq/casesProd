import { baseUrl, casesApi } from "./queryWithRefresh";

export interface LastOpenedBox {
  timestamp: string;
  user: {
    id: string;
    name: string;
  };
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

export interface IBox {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  CaseItem?: {
    drop_rate: number;
    item: {
      id: number;
      name: string;
      image: string;
      price: number;
    };
  }[];
}

export const boxesApiSlice = casesApi.injectEndpoints({
  endpoints: (build) => ({
    getBoxes: build.query<IBox[], string>({
      query: () => ({
        url: "boxes/all",
      }),
      transformResponse: (response: IBox[]) => {
        return response.map((item) => ({
          ...item,
          image: `${baseUrl}/${item.image}`,
          CaseItem: item.CaseItem?.map((caseItem) => ({
            ...caseItem,
            item: {
              ...caseItem.item,
              image: `${baseUrl}/${caseItem.item.image}`,
            },
          })),
        }));
      },
    }),

    rollBox: build.query<{ itemId: number }, number>({
      query: (boxId) => ({
        url: "boxes/roll/" + boxId,
        method: "GET",
      }),
    }),

    getLastBoxes: build.query<LastOpenedBox[], void>({
      query: () => ({
        url: "boxes/last",
        method: "GET",
      }),
    }),
  }),
});
