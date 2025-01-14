import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CalendarDays, Clock5, Dot, MapPinHouse } from "lucide-react";
import { ReactNode } from "react";
import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import Link from "next/link";
import { Rating } from "../ui/rating";
import moment from "moment";
import { TJobApplication } from "@/types";

const JobApplyCard = ({
  data,
  children,
}: {
  data: TJobApplication;
  children?: ReactNode;
}) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="flex flex-col lg:flex-row lg:items-start justify-center items-center  gap-4 pt-6">
        {/* image and rating */}
        <div className="flex flex-col justify-center items-center gap-y-2">
          <Link href={`/all-babysitters/${data?.babysitter?.userId}`}>
            <Image
              src={data?.babysitter?.user?.profilePicture}
              alt="baby sitter"
              width={1000}
              height={900}
              className="lg:size-36 size-52"
            ></Image>
          </Link>
          <div className="flex gap-x-2 items-center ">
            <Rating
              size={18}
              rating={data?.babysitter?.avgRating}
              className="text-[#FFA14E]"
            ></Rating>
            <p className="text-primary-gray">
              <span>({data?.babysitter?.reviewCount})</span>
            </p>
          </div>
        </div>

        {/* name, address, description */}
        <div className=" flex-1 flex flex-col   gap-y-4 ">
          <Link href={`/all-babysitters/${data?.babysitter?.userId}`}>
            <h4 className="text-xl lg:text-2xl font-medium text-primary-black">
              {data?.babysitter?.firstName} {data?.babysitter?.lastName}
            </h4>
          </Link>
          {/* Date and time */}
          <div className="flex flex-wrap gap-x-2 justify-between">
            <div className="flex gap-x-2 items-center text-lg text-primary-gray">
              <CalendarDays color="#F26D6D" />
              Date: {moment(data?.jobPost?.date).format("MMM Do YYYY")}
            </div>
            <div>
              <div className="flex gap-x-2 items-center text-lg text-primary-gray">
                <Clock5 color="#F26D6D" />
                Time: {data?.jobPost?.startTime} - {data?.jobPost?.endTime}
              </div>
            </div>
          </div>

          {/* location , experience, booking */}
          <div className="flex flex-col md:flex-row gap-2 justify-between lg:items-center">
            <p className="flex gap-x-2 items-center text-lg text-primary-gray">
              <MapPinHouse color="#F26D6D" size={20} />
              {data?.jobPost?.area}, {data?.jobPost?.city},{" "}
              {data?.jobPost?.state}{" "}
              {data?.jobPost?.zipCode && ", " + data?.jobPost?.zipCode}
            </p>
            <Dot color="#141414B2" className="hidden md:block"></Dot>
            <p className="flex  gap-2 items-center text-lg text-primary-gray">
              <Image src={icon1} alt="icon" />
              {data?.jobPost?.children?.length}
            </p>
          </div>

          {/* description */}
          <p className="text-lg text-primary-gray">
            {data?.jobPost?.description.length > 199
              ? data?.jobPost?.description.slice(0, 200) + "..."
              : data?.jobPost?.description}
          </p>

          {/* action button  */}
          {children && <div>{children}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplyCard;
