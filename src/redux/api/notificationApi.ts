import { read } from "fs";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (data) => ({
        url: "/notification/notifications",
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes?.notification],
    }),
    readNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/read`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes?.notification],
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationApi;
