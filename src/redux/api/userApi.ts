import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.userData],
    }),
  }),
});
export const { useGetUserQuery } = useApi;
