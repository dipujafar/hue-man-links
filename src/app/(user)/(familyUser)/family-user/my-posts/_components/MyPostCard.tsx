import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CalendarDays, Clock5, MapPinHouse } from "lucide-react";
import { ReactNode } from "react";
import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import { TJobPost } from "@/types";
import moment from "moment";

const MyPostCard = ({
  data,
  children,
}: {
  data: TJobPost;
  children?: ReactNode;
}) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="flex flex-col lg:flex-row lg:items-start justify-center items-center  gap-4 pt-6">
        {/* image and rating */}

        {/* name, address, description */}

        <div className=" flex-1 flex flex-col   gap-y-3 ">
          {data?.status === "PENDING" && (
            <div className="px-2 bg-orange-600 w-fit rounded-full text-white">
              Pending
            </div>
          )}
          {data?.status === "COMPLETED" && (
            <div className="px-2 bg-green-600 w-fit rounded-full text-white">
              Completed
            </div>
          )}
          <h4 className="text-xl lg:text-2xl font-medium text-primary-black">
            {data?.fullName}
          </h4>
          {/* Date and time */}
          <div className="flex flex-wrap gap-x-2 justify-between">
            <div className="flex gap-x-2 items-center md:text-lg text-primary-gray mb-1 ">
              <CalendarDays color="#F26D6D" size={18} />
              Date: {moment(data?.date).format("MMM Do YYYY")}
            </div>
            <div>
              <div className="flex gap-x-2 items-center md:text-lg text-primary-gray">
                <Clock5 color="#F26D6D" size={18} />
                Time: {data?.startTime} - {data?.endTime}
              </div>
            </div>
          </div>

          {/* location , experience, booking */}
          <div className="flex flex-col md:flex-row gap-2 justify-between lg:items-center">
            <p className="flex gap-x-2  md:text-lg text-primary-gray lg:max-w-xl  md:max-w-sm">
              <MapPinHouse color="#F26D6D" size={18} className="w-fit" />
              {data?.area}, {data?.city}, {data?.state}{" "}
              {data?.zipCode && ", " + data?.zipCode}
            </p>

            <p className="flex  gap-2 items-center md:text-lg text-primary-gray">
              <Image src={icon1} alt="icon" className="size-5" />
              {data?.children?.length}
            </p>
            {/* <Dot color="#141414B2" className="hidden md:block"></Dot>
            <p className="flex gap-x-2 items-center md:text-lg text-primary-gray">
              <Image src={icon2} alt="icon" className="size-5" />
              {data?.children?.map((child) => child?.age + " ,")} Years
            </p> */}
          </div>

          {/* description */}
          <p className="text-primary-gray text-sm md:text-base">
            {data?.description.length > 199
              ? data?.description.slice(0, 200) + "..."
              : data?.description}
          </p>

          {/* action button  */}
          {children && <div>{children}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyPostCard;
