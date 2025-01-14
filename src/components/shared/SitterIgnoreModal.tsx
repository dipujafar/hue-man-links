"use client";
import { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useIgnoreSitterMutation } from "@/redux/api/ignoreSitterApi";
import { TError } from "@/types";
import { Error_Modal } from "../modals/modals";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SitterIgnoreModal = ({
  open,
  setOpen,
  sitterId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sitterId?: string;
}) => {
  const [ignoreSitter, { isLoading }] = useIgnoreSitterMutation();
  const router = useRouter();

  const handleIgnoreSitter = async () => {
    try {
      await ignoreSitter({ babysitterId: sitterId }).unwrap();
      toast.success("Sitter ignored successfully.");
      router.push("/book-babysitter-request");
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You want to ignore this sitter for further job?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleIgnoreSitter()}
            className="bg-primary-orange"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SitterIgnoreModal;
