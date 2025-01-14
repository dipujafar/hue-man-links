"use client";
import loginAni from "@/assets/lotti-file/loader_animation.json";
import Lottie from "lottie-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Lottie
        animationData={loginAni}
        loop={true}
        className="w-[300px] md:w-[500px] lg:w-[600px]"
      ></Lottie>
    </div>
  );
}
