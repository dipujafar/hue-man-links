
import { Skeleton } from "../ui/skeleton";

const DashboardPageSkeleton = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row  md:gap-x-3 gap-y-3">
      <Skeleton className="h-fit  md:w-3/4 w-full p-5 space-y-5">
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
        <Skeleton className="h-8 w-full bg-gray-300"></Skeleton>
      </Skeleton>
      <Skeleton className="h-[250px] md:w-1/4 w-full flex flex-col gap-y-2 justify-center items-center px-5">
        <Skeleton className="rounded-full bg-gray-300 size-40"></Skeleton>
        <Skeleton className="h-3 w-full bg-gray-300"></Skeleton>
      </Skeleton>
    </div>
  );
};

export default DashboardPageSkeleton;
