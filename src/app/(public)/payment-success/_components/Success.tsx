"use client";
import Container from "@/components/shared/Container";
import loginAni from "@/assets/lotti-file/Main Scene _5.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "@/components/shared/LoginModal";

const Success = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container className="flex items-center justify-center flex-col min-h-screen">
        <Lottie
          animationData={loginAni}
          loop={false}
          className="w-[300px] md:w-[500px] lg:w-[700px]"
        ></Lottie>

        <h1 className="text-5xl font-medium text-green-800">Successfully </h1>
        <div className="mt-3 space-x-2">
          <Link href={"/"}>
            <Button
              variant={"outline"}
              className="border-primary-orange text-primary-orange"
            >
              Home
            </Button>
          </Link>
          <Button onClick={() => setOpen(true)} className="bg-primary-orange">
            Login
          </Button>
        </div>
      </Container>
      <LoginModal open={open} setOpen={setOpen}></LoginModal>
    </>
  );
};

export default Success;
