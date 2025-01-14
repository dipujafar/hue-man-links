import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import icon2 from "@/assets/icons/sitter/sitterPageIcon2.png";
import icon3 from "@/assets/icons/user/interestIcon.png";
import { TSingleJobPost } from "@/types";
import { CalendarDays, ChartSpline, Clock5, UsersRound } from "lucide-react";
import Image from "next/image";
import moment from "moment";
import SendReview from "@/components/shared/Review/SendReview";

const PostInfo = ({ data }: { data: TSingleJobPost }) => {
  console.log(data);
  return (
    <div className="lg:space-y-10 space-y-5">
      <p className="text-lg text-primary-gray">{data?.description}</p>

      <hr />

      {/* statistics */}
      {/* Name and status */}
      <div className=" space-y-3	">
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="flex gap-x-2 items-center text-lg text-primary-gray mb-1">
            <UsersRound color="#F26D6D" />
            <p className="flex gap-x-2 justify-between lg:justify-start	 flex-1">
              <span>Name:</span> {data?.fullName}
            </p>
          </div>
          <div>
            <div className="flex gap-x-2 items-center text-lg text-primary-gray">
              <ChartSpline color="#F26D6D" />
              <p className="flex gap-x-2 justify-between lg:justify-start flex-1">
                <span>Status: </span>{" "}
                {data?.status === "COMPLETED" && "Completed"}
                {data?.status === "PENDING" && "Pending"}
                {data?.status === "REQUESTED" && "Initial Post"}
              </p>
            </div>
          </div>
        </div>
        {/* Date and time */}
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="flex gap-x-2 items-center text-lg text-primary-gray ">
            <CalendarDays color="#F26D6D" />
            <p className="flex gap-x-2 justify-between lg:justify-start flex-1">
              <span> Date: </span>
              {moment(data?.date).format("MMM Do YYYY")}
            </p>
          </div>
          <div>
            <div className="flex gap-x-2 items-center text-lg text-primary-gray">
              <Clock5 color="#F26D6D" />
              <p className="flex gap-x-2 justify-between lg:justify-start flex-1">
                <span>Time: </span> {data?.startTime} - {data?.endTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* children details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
        {data?.children?.map((child, index) => (
          <div key={index} className="lg:space-y-5 space-y-3">
            <div className="flex items-center gap-x-4">
              <Image src={icon1} alt="icon1"></Image>
              <div className="text-lg font-medium text-primary-black">
                <h4>{index > 0 && index + 1 + "."} Child’s Name</h4>
                <p>{child?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <Image src={icon2} alt="icon1"></Image>
              <div className="text-lg font-medium text-primary-black">
                <h4>Child's Age</h4>
                <p>{child?.age} years old</p>
              </div>
            </div>
            <div className="flex  gap-x-4">
              <Image src={icon3} alt="icon1" className="h-fit"></Image>
              <div className="text-lg font-medium text-primary-black">
                <h4>Child's characteristic</h4>
                <div className="flex flex-wrap   gap-2">
                  {child?.characteristics?.map((characteristic) => (
                    <p
                      className="text-lg text-primary-violet py-1 px-3 bg-primary-violet/15 rounded-full font-medium w-fit truncate"
                      key={characteristic}
                    >
                      {characteristic}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* review */}
      {data?.status === "COMPLETED" && (
        <div>
          <h1 className="text-xl text-primary-blue font-medium mb-2">
            Reviews & Ratings
          </h1>
          <hr />
          <div className="mt-5">
            <SendReview id={data?.userId}></SendReview>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
