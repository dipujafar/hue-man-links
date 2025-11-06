import { baseApi } from "./baseApi";

const mainSendApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMailInterestLink: build.mutation({
      query: (data) => ({
        url: "/settings/interest-form-for-link",
        method: "POST",
        body: data,
      }),
    }),
    sendMailClientIntakeForm: build.mutation({
      query: (data) => ({
        url: "/settings/client-intake-form",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendMailInterestLinkMutation,
  useSendMailClientIntakeFormMutation,
} = mainSendApi;
