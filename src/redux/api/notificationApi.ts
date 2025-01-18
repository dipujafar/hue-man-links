import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notification/notifications",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;
