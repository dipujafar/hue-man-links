import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const createUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/family-user/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        tagTypes?.user,
        tagTypes?.userProfile,
        tagTypes?.userData,
      ],
    }),
    createSitter: builder.mutation({
      query: (data) => ({
        url: "/user/baby-sitter/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        tagTypes?.user,
        tagTypes?.userProfile,
        tagTypes?.userData,
      ],
    }),
  }),
});

export const { useCreateUserMutation, useCreateSitterMutation } = createUserApi;
