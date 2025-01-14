import { baseApi } from "./baseApi";

const topLinkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTopLink: build.query({
      query: () => ({
        url: "/user/top-linkers",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTopLinkQuery } = topLinkApi;
