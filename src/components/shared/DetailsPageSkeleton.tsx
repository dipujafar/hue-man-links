import React from "react";
import { Skeleton } from "../ui/skeleton";

const DetailsPageSkeleton = () => {
  return (
    <div className="lg:space-y-7 space-y-5">
      <Skeleton className="h-[280px] py-2 flex flex-col lg:flex-row  gap-5 justify-center items-center">
        <Skeleton className="size-52 rounded-full bg-gray-300"></Skeleton>
        <Skeleton className="h-[25px] w-[250px] rounded-full bg-gray-300"></Skeleton>
      </Skeleton>
      <div className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-5">
        <Skeleton className="h-[280px] p-2  w-full space-y-5">
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
        </Skeleton>
        <Skeleton className="h-[280px] p-2 lg:w-1/3 w-full space-y-5">
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
          <Skeleton className="h-[25px] w-full rounded-full bg-gray-300"></Skeleton>
        </Skeleton>
      </div>
    </div>
  );
};

export default DetailsPageSkeleton;
