import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { Rating } from "../ui/rating";
import {
  CalendarDays,
  ChevronRight,
  Dot,
  MapPinHouse,
  SquareLibrary,
} from "lucide-react";

const BabySitterCard = ({ data }: { data: any }) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="flex flex-col lg:flex-row lg:items-start justify-center items-center  gap-6 pt-6">
        {/* image and rating */}
        <div className="flex flex-col justify-center items-center gap-y-2">
          <Image
            src={data?.babysitter?.user?.profilePicture}
            alt="baby sitter"
            width={1000}
            height={900}
            className="lg:size-28 size-20 md:size-40"
          ></Image>
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
        <div className=" flex-1 flex flex-col   gap-y-6 ">
          <h4 className="text-xl lg:text-3xl font-medium text-primary-black truncate">
            {data?.babysitter?.firstName} {data?.babysitter?.lastName}
          </h4>

          {/* location , experience, booking */}
          <div className="flex flex-col md:flex-row gap-2 justify-between lg:items-center ">
            <p className="flex gap-x-2 items-center text-lg text-primary-gray md:max-w-xl max-w-[280px]">
              <MapPinHouse color="#F26D6D" size={20} />
              {data?.babysitter?.user?.area}, {data?.babysitter?.user?.city},{" "}
              {data?.babysitter?.user?.state}, {data?.babysitter?.user?.zipCode}
            </p>
            <Dot color="#141414B2" className="hidden md:block"></Dot>
            <p className="flex  gap-2 items-center text-lg text-primary-gray truncate">
              <SquareLibrary color="#F26D6D" size={20} />
              <span className="flex items-center">
                Experience : <ChevronRight />
                {data?.babysitter?.experience} years
              </span>
            </p>
          </div>

          {/* description */}
          <p className="text-lg text-primary-gray">
            {data?.babysitter?.bio?.length > 200
              ? data?.babysitter?.bio.slice(0, 200) + "..."
              : data?.babysitter?.bio}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BabySitterCard;
