import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const ignoreSitterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ignoreSitter: builder.mutation({
      query: (data) => ({
        url: "/ignored-sitter/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.ignoreSitter],
    }),
    getIgnoreSitter: builder.query({
      query: () => ({
        url: `/ignored-sitter/sitters`,
        method: "GET",
      }),
      providesTags: [tagTypes?.ignoreSitter],
    }),
  }),
});

export const { useIgnoreSitterMutation } = ignoreSitterApi;
