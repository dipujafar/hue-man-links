"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCreateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { TError } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Error_Modal } from "../modals/modals";

const MakeSubscriptionModal = ({
  open,
  setOpen,
  role,
  email,
  message,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  role?: string;
  email?: string;
  message?: string;
}) => {
  const [createPayment, { isLoading: isCreateSubscriptionLoading }] =
    useCreateSubscriptionMutation();
  const router = useRouter();

  const createSubscription = async () => {
    toast.loading("processing...");
    try {
      const res = await createPayment({
        email: email,
        membership: "SITTER",
      }).unwrap();
      router.push(res?.data?.paymentLink);
      toast.dismiss();
    } catch (error: TError | any) {
      toast.dismiss();
      Error_Modal({ title: error?.data?.message });
    }
  };
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sorry!</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {role == "FAMILY_USER" && email && (
              <Link href={`/choice-membership?email=${email}`}>
                <AlertDialogAction className="bg-red-500">
                  Subscription
                </AlertDialogAction>
              </Link>
            )}
            {role == "BABY_SITTER" && email && (
              <AlertDialogAction
                className="bg-red-500"
                onClick={() => createSubscription()}
              >
                Subscription
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MakeSubscriptionModal;
