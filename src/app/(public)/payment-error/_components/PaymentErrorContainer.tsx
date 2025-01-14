"use client";
import Container from "@/components/shared/Container";
import loginAni from "@/assets/lotti-file/error_animation.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentErrorContainer = () => {
  return (
    <>
      <Container className="flex items-center justify-center flex-col min-h-screen">
        <Lottie
          animationData={loginAni}
          loop={true}
          className="w-[300px] md:w-[500px] lg:w-[600px]"
        ></Lottie>

        <h1 className="text-5xl font-medium text-green-800">
          Something went wrong{" "}
        </h1>
        <div className="mt-5 space-x-2">
          <Link href={"/"}>
            <Button
              variant={"outline"}
              className="border-primary-orange text-primary-orange px-16 py-6 text-lg"
            >
              Home
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default PaymentErrorContainer;
