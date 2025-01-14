import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.auth, tagTypes?.userProfile],
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.auth],
    }),
    verifyOpt: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.auth],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes?.auth],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes?.auth],
    }),
    resendOtp: builder.mutation({
      query: () => ({
        url: "/auth/resend-otp",
        method: "POST",
      }),
      invalidatesTags: [tagTypes?.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyOptMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useResendOtpMutation,
} = authApi;
