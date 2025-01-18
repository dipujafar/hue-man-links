import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CalendarDays, Clock5, MapPinHouse } from "lucide-react";
import { ReactNode } from "react";
import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import { TJobPost } from "@/types";
import moment from "moment";

const JobCard = ({
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
        <div className="flex flex-col justify-center items-center gap-y-2">
          <Image
            src={data?.user?.profilePicture}
            alt="user profile"
            width={1000}
            height={900}
            className="lg:size-32 size-24  "
          ></Image>
        </div>

        {/* name, address, description */}
        <div className=" flex-1 flex flex-col   gap-y-3 ">
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
            <p className="flex gap-x-2  md:text-lg text-primary-gray lg:max-w-lg  md:max-w-sm">
              <MapPinHouse color="#F26D6D" size={18} className="w-fit" />
              {data?.area}, {data?.zipCode}, {data?.city}
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

export default JobCard;
