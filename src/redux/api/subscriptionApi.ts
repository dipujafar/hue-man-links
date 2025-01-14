import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const subscriptionApi = baseApi?.injectEndpoints({
  endpoints: (build) => ({
    createSubscription: build.mutation({
      query: (data) => ({
        url: "/subscription/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.subscription],
    }),
    cancelSubscription: build.mutation({
      query: () => ({
        url: "/subscription/cancel",
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes?.subscription],
    }),
    getSubscription: build.query({
      query: () => ({
        url: "/subscription/subscriptions",
        method: "GET",
      }),
      providesTags: [tagTypes?.subscription],
    }),
    updateSubscription: build.mutation({
      query: (data) => ({
        url: "/subscription/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes?.subscription],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetSubscriptionQuery,
  useCancelSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionApi;
