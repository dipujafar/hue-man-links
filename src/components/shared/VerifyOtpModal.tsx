"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Dispatch, SetStateAction, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useForm } from "react-hook-form";
import SetNewPasswordModal from "./SetNewPasswordModal";
import {
  useResendOtpMutation,
  useVerifyOptMutation,
} from "@/redux/api/authApi";
import { TError } from "@/types";
import { Error_Modal } from "../modals/modals";
import LoadingSpain from "../loaders/LoadingSpain";
import { useCreateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

const VerifyOtpModal = ({
  open,
  setOpen,
  email,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  email?: string;
}) => {
  const [otp, setOtp] = useState("");
  const [showSetNewPasswordModal, setShowSetNewPasswordModal] = useState(false);
  const [verifyOpt, { isLoading: isVerifyOptLoading }] = useVerifyOptMutation();
  const { handleSubmit } = useForm();
  const [createSubscription, { isLoading: isCreateSubscriptionLoading }] =
    useCreateSubscriptionMutation();
  const [resendOpt, { isLoading: isResendOptLoading }] = useResendOtpMutation();
  const router = useRouter();

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
        console.log(err?.data?.message);
        Error_Modal({ title: err?.data?.message });
        return;
        
      }
    }

    try {
      await verifyOpt({ otp: Number(otp) }).unwrap();
      setOpen(false);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-primary-gray/70 text-2xl">
              Verify Email
            </DialogTitle>
            <DialogDescription className="text-center">
              Please check your email for the verification code
            </DialogDescription>
          </DialogHeader>
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
                      className=" mx-2 border border-primary-gray/50 bg-primary-light-gray size-12"
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
        </DialogContent>
      </Dialog>
      <SetNewPasswordModal
        open={showSetNewPasswordModal}
        setOpen={setShowSetNewPasswordModal}
      ></SetNewPasswordModal>
    </>
  );
};

export default VerifyOtpModal;
