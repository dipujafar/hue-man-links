import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendReview: builder.mutation({
      query: (data) => ({
        url: "/review/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.review, tagTypes?.userData],
    }),
    getUserReview: builder.query({
      query: (id) => ({
        url: `/review/my-reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes?.review],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: `/review/reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes?.review],
    }),
  }),
});

export const {
  useSendReviewMutation,
  useGetUserReviewQuery,
  useGetAllReviewsQuery,
} = reviewApi;
