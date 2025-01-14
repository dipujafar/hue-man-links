import { baseApi } from "./baseApi";

const settingAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => ({
        url: "/settings/Terms",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetTermsQuery } = settingAPi;
