import React from "react";
import { Skeleton } from "../ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <Skeleton className="h-[200px] p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        <Skeleton className="lg:size-32 md:size-52 size-40 bg-gray-300/80"></Skeleton>
        <div className="flex-1 space-y-5">
          <Skeleton className="h-[20px] bg-gray-300/60"></Skeleton>
          <Skeleton className="h-[20px] bg-gray-300/60"></Skeleton>
          <Skeleton className="h-[20px] bg-gray-300/60"></Skeleton>
          <Skeleton className="h-[40px] bg-gray-300/60"></Skeleton>
        </div>
      </div>
    </Skeleton>
  );
};

export default PostCardSkeleton;
