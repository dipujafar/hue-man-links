import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes?.userProfile],
    }),
    updateSitterProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-sitter-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes?.userProfile],
    }),
    updateFamilyProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-family-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes?.userProfile],
    }),
    getSingleUserProfile: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.userProfile],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateSitterProfileMutation,
  useUpdateFamilyProfileMutation,
  useGetSingleUserProfileQuery,
} = userProfileApi;
