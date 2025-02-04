"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { useForm } from "react-hook-form";
import { Error_Modal, Success_model } from "../modals/modals";
import { TError } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import LoadingSpain from "../loaders/LoadingSpain";
import logo from "@/assets/Images/logo.png";
import Image from "next/image";

const SetNewPasswordModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // const [openLoginModal, setOpenLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await resetPassword({ password: data.newPassword }).unwrap();
      if (res?.data?.accessToken) {
        Success_model({ title: "Login Successful" });
        sessionStorage.removeItem("token");
        dispatch(
          setUser({
            user: jwtDecode(res?.data?.accessToken),
            token: res?.data?.accessToken,
          })
        );
        {
          res.data.role === "FAMILY_USER"
            ? router.push("/book-babysitter-request")
            : router.push("/all-job-posts");
        }
        // router.push("/book-babysitter-request");
        // router.refresh();
      }
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-center text-primary-gray/70 text-2xl">
              <div>
                <Image
                  src={logo}
                  alt="logo"
                  className="max-w-[200px] mx-auto"
                ></Image>
              </div>
              Set a new password
            </DialogTitle>
            <DialogDescription className="text-center max-w-sm mx-auto">
              Create a new password. Ensure it differs from previous ones for
              security
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              {/* Input password with eye icon to toggle visibility */}
              <div>
                <Label>New Password</Label>{" "}
                <div className="relative flex flex-col space-y-1.5">
                  <Input
                    id="newPassword"
                    placeholder={"********"}
                    type={showPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "New Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                        message:
                          "Password must contain an uppercase letter and a symbol",
                      },
                    })}
                    className="w-full py-5 bg-primary-light-gray"
                  />

                  {/* Eye icon to toggle password visibility */}
                  <div
                    className="absolute right-3 top-1/3 -translate-y-1/2 transform cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#60778C" />
                    ) : (
                      <Eye size={20} color="#60778C" />
                    )}
                  </div>
                </div>
              </div>
              {errors.newPassword && (
                <p className="-mt-2 text-sm text-red-500">
                  {errors.newPassword.message as string}
                </p>
              )}
              {/* Input Confirm Password with eye icon to toggle visibility */}
              <div>
                <Label>Confirm Password</Label>
                <div className="relative flex flex-col space-y-1.5">
                  <Input
                    id="confirmPassword"
                    placeholder={"********"}
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    className="w-full py-5 bg-primary-light-gray"
                  />

                  {/* Eye icon to toggle password visibility */}
                  <div
                    className="absolute right-3 top-1/3 -translate-y-1/2 transform cursor-pointer"
                    onClick={() => setConfirmShowPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#60778C" />
                    ) : (
                      <Eye size={20} color="#60778C" />
                    )}
                  </div>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="-mt-2 text-sm text-red-500">
                  {errors.confirmPassword.message as string}
                </p>
              )}
              {/* Login button */}
              <Button
                disabled={isLoading}
                type="submit"
                className=" bg-primary-orange"
              >
                {isLoading && (
                  <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
                )}
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* <LoginModal
        open={openLoginModal}
        setOpen={setOpenLoginModal}
      ></LoginModal> */}
    </>
  );
};

export default SetNewPasswordModal;
