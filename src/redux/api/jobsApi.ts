import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypes";

const jobsApi = baseApi?.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (data) => ({
        url: `/job/jobs`,
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes?.jobs],
    }),

    createJob: builder.mutation({
      query: (data) => ({
        url: `/job/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.jobs],
    }),
    singleJob: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.jobs],
    }),
    getUserJobPost: builder.query({
      query: (data) => ({
        url: `/job/my-jobs`,
        method: "GET",
        params: data,
      }),
      providesTags: [tagTypes?.jobs],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.jobs],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useCreateJobMutation,
  useSingleJobQuery,
  useGetUserJobPostQuery,
  useDeleteJobMutation,
} = jobsApi;
