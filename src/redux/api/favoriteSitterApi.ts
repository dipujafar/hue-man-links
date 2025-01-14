import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const favoriteSitterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postFavoriteSitter: builder.mutation({
      query: (data) => ({
        url: "/favorite-sitter/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.favoriteSitter],
    }),
    getFavoriteSitter: builder.query({
      query: () => ({
        url: `/favorite-sitter/sitters`,
        method: "GET",
      }),
      providesTags: [tagTypes?.favoriteSitter],
    }),
    removeFavoriteSitter: builder.mutation({
      query: (id) => ({
        url: `/favorite-sitter/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.favoriteSitter],
    }),
  }),
});

export const {
  useGetFavoriteSitterQuery,
  usePostFavoriteSitterMutation,
  useRemoveFavoriteSitterMutation,
} = favoriteSitterApi;
