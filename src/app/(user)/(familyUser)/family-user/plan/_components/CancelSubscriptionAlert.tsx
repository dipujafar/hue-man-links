"use client";
import {
  Error_Modal,
  SuccessModalWithButton,
} from "@/components/modals/modals";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCancelSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TError } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

const CancelSubscriptionAlert = () => {
  const [cancel, { isLoading: isLoading }] = useCancelSubscriptionMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleCancelSubscription = async () => {
    try {
      await cancel(undefined).unwrap();
      dispatch(logout());
      router.refresh();
      SuccessModalWithButton({
        title: "Cancelled Successfully",
        text: "You will get back your found amount within 5 to 10 days.",
      });
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" w-fit  text-primary-white hover:bg-primary-gray hover:text-primary-white font-semibold bg-red-500">
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You want to cancel your subscription.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            disabled={isLoading}
            onClick={() => handleCancelSubscription()}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelSubscriptionAlert;
