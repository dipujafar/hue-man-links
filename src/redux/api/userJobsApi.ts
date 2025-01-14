import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userJobsApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    getUserJobs: builder.query({
      query: (data) => ({
        url: "/application/my-applications",
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes?.userJobs],
    }),
    updateJobStatus: builder.mutation({
      query: (data) => ({
        url: `/application/update/${data.id}`,
        method: "PATCH",
        body: data?.status,
      }),
      invalidatesTags: [tagTypes?.userJobs, tagTypes?.babySitterJobs],
    }),
  }),
});

export const { useGetUserJobsQuery, useUpdateJobStatusMutation } = userJobsApi;
