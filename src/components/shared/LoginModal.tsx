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
import Link from "next/link";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";
import { Error_Modal, Success_model } from "../modals/modals";
import { TError } from "@/types";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import LoadingSpain from "../loaders/LoadingSpain";
import MakeSubscriptionModal from "./MakeSubscriptionModal";

type TData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [opeForgetPasswordModal, setOpenForgetPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [makeSubscription, setMakeSubscription] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<TData> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res?.data?.accessToken) {
        Success_model({ title: "Login Successful" });
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
      const error = err?.data?.message?.split(",");
      if (error?.[0] === "before login you have get a subscription") {
        setRole(error[1]);
        setEmail(data.email);
        setMessage("Before login you have get a subscription.");
        setMakeSubscription(true);
        setOpen(false);
        return;
      }

      if (error?.[0] === "Your subscription is expired") {
        setRole(error[2]);
        setEmail(data.email);
        setMessage("Your subscription is expired, please renew");
        setMakeSubscription(true);
        setOpen(false);
        return;
      }

      Error_Modal({ title: err?.data?.message });
    }

    // Handle form submission (e.g., send data to API)
    // if (data?.email === "user@gmail.com") {
    //   localStorage.setItem("role", "familyUser");
    //   router.push("/book-babysitter-request");
    //   return;
    // }
    // if (data?.email === "babysitter@gmail.com") {
    //   localStorage.setItem("role", "babySitter");
    //   router.push("/all-job-posts");
    //   return;
    // }
    // toast.error("You are not valid user");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-primary-gray/70 text-2xl">
              Login to Account
            </DialogTitle>
            <DialogDescription className="text-center">
              Please enter your email and password to continue
            </DialogDescription>
          </DialogHeader>
          {/* @ts-ignore */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* `---- input E-mail ---- */}
              <div className="grid w-full items-center gap-2">
                <Label className="text-lg font-medium text-primary-black/80">
                  Email address:
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="example@ex.com"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* `---- input Password ---- */}
              <div>
                <div className="relative">
                  <div className="grid w-full items-center gap-2">
                    <Label className="text-lg font-medium text-primary-black/80">
                      Password:
                    </Label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="********"
                      className="w-full py-5 bg-primary-light-gray"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  <div
                    className="absolute right-3 top-1/2 translate-y-1   cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye color="#60778C" />
                    ) : (
                      <EyeOff color="#60778C" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              {/* Remember me and Forgot Password */}
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  {/* <Checkbox id="remember" className="text-primary-black/50" /> */}
                  {/* <label
                    htmlFor="remember"
                    className="ml-2 text-primary-black/70"
                  >
                    Remember Password
                  </label> */}
                </div>
                <p
                  onClick={() => {
                    setOpen(false);
                    setOpenForgetPasswordModal(true);
                  }}
                  className="text-primary-black/70 cursor-pointer"
                >
                  Forget Password?
                </p>
              </div>

              {/* Submit Button */}
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary-orange"
              >
                {isLoading && (
                  <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
                )}
                Sign In
              </Button>
            </div>
          </form>

          {/* Sign Up Links */}
          <p className="text-center mt-4">
            Don't have an account? please{" "}
            <Link
              href="/make-connection"
              className="text-blue-900 cursor-pointer"
            >
              Make Connection
            </Link>{" "}
            or{" "}
            <Link href="/link-sitters" className="text-blue-900 cursor-pointer">
              Become a link sitter
            </Link>
          </p>
        </DialogContent>
      </Dialog>

      {/* Forget Password Modal */}
      <ForgetPasswordModal
        open={opeForgetPasswordModal}
        setOpen={setOpenForgetPasswordModal}
      />

      {/* make subscription modal */}
      <MakeSubscriptionModal
        open={makeSubscription}
        setOpen={setMakeSubscription}
        role={role}
        email={email}
        message={message}
      ></MakeSubscriptionModal>
    </>
  );
};

export default LoginModal;
