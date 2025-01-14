import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: "/user/send-mail",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
