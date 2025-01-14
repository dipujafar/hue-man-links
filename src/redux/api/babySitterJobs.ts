import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const babySitterJobsApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    getBabySitterJobs: builder.query({
      query: (data) => ({
        url: "/application/my-applied-jobs",
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes?.babySitterJobs],
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/application/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.babySitterJobs, tagTypes?.jobs],
    }),
    deleteJobApplication: builder.mutation({
      query: (id) => ({
        url: `/application/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.babySitterJobs, tagTypes?.jobs],
    }),
  }),
});

export const {
  useGetBabySitterJobsQuery,
  useApplyJobMutation,
  useDeleteJobApplicationMutation,
} = babySitterJobsApi;
