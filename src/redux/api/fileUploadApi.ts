import { baseApi } from "./baseApi";

const fileUploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: "/user/upload-image",
        method: "POST",
        body: data,
      }),
    }),
    multipleFileUpload: builder.mutation({
      query: (data) => ({
        url: "/upload/images",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useUploadFileMutation, useMultipleFileUploadMutation } =
  fileUploadApi;
