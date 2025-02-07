"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useResendOtpMutation,
  useVerifyOptMutation,
} from "@/redux/api/authApi";
import { TError } from "@/types";
import { useCreateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/Images/logo.png";
import Image from "next/image";
import { Error_Modal } from "@/components/modals/modals";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import SetNewPasswordModal from "@/components/shared/SetNewPasswordModal";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [showSetNewPasswordModal, setShowSetNewPasswordModal] = useState(false);
  const [verifyOpt, { isLoading: isVerifyOptLoading }] = useVerifyOptMutation();
  const { handleSubmit } = useForm();
  const [createSubscription, { isLoading: isCreateSubscriptionLoading }] =
    useCreateSubscriptionMutation();
  const [resendOpt, { isLoading: isResendOptLoading }] = useResendOtpMutation();
  const router = useRouter();
  const email = useSearchParams().get("email");

  const onSubmit = async () => {
    const signUpToken = sessionStorage.getItem("signUpToken");
    if (signUpToken) {
      try {
        const res = await verifyOpt({ otp: Number(otp) }).unwrap();
        if (res?.success) {
          const resSubscription = await createSubscription({
            email,
          }).unwrap();
          sessionStorage.removeItem("signUpToken");
          router.push(resSubscription?.data?.paymentLink);
        }

        return;
      } catch (err: TError | any) {
        Error_Modal({ title: err?.data?.message });
        return;
      }
    }

    try {
      await verifyOpt({ otp: Number(otp) }).unwrap();

      setShowSetNewPasswordModal(true);
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  const handleResendOtp = async () => {
    if (isResendOptLoading) return;
    try {
      await resendOpt(undefined).unwrap();
      toast.success("OTP sent successfully.Please check your email.");
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  return (
    <>
      <div className="md:max-w-[500px] max-w-[250px] mx-auto flex justify-center items-center min-h-[80vh] ">
        <div className="border p-3 rounded">
          <div>
            <div className="text-center text-primary-gray/70 text-2xl">
              <div>
                <Image
                  src={logo}
                  alt="logo"
                  className="max-w-[200px] mx-auto"
                ></Image>
              </div>
              Verify Email
            </div>
            <p className="text-center">
              Please check your email for the verification code
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* OTP Input */}
            <div className="flex flex-col justify-center items-center space-y-5">
              <InputOTP
                maxLength={6}
                className="w-full"
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className=" mx-2 border border-primary-gray/50 bg-primary-light-gray md:size-12 size-9"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex justify-end mt-2  ">
              <div
                onClick={() => handleResendOtp()}
                className="flex items-center gap-x-1 cursor-pointer  group"
              >
                <RotateCcw size={18} className="group-hover:animate-spin" />
                <p>Resend</p>
              </div>
            </div>
            <Button
              disabled={
                otp.length < 6 ||
                isVerifyOptLoading ||
                isCreateSubscriptionLoading
              }
              className="w-full bg-primary-orange mt-1"
            >
              {isCreateSubscriptionLoading ||
                (isVerifyOptLoading && (
                  <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
                ))}
              Verify Code
            </Button>
          </form>
        </div>
      </div>
      <SetNewPasswordModal
        open={showSetNewPasswordModal}
        setOpen={setShowSetNewPasswordModal}
      ></SetNewPasswordModal>
    </>
  );
};

export default VerifyOtp;
