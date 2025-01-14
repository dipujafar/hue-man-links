import { AlignJustify } from "lucide-react";
import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import icon2 from "@/assets/icons/sitter/sitterPageIcon2.png";
import icon3 from "@/assets/icons/sitter/sitterPageIcon3.png";
import Image from "next/image";
import { TBabysitterUser } from "@/types";

const ProfileDetails = ({ data }: { data: TBabysitterUser }) => {
  return (
    <div className="lg:space-y-10 space-y-5">
      <p className="text-lg text-primary-gray">{data?.babysitter?.bio}</p>

      {/* Characteristics */}
      <div className="space-y-5">
        <div className="flex items-center gap-x-2">
          <AlignJustify color="#F26D6D" />
          <h5 className="text-xl font-medium">Skills</h5>
        </div>
        <div className="flex  gap-x-2">
          {data?.babysitter?.skills?.map((characteristic) => (
            <p
              className="text-lg text-primary-violet  px-3 bg-primary-violet/15 rounded-full font-medium"
              key={characteristic}
            >
              {characteristic}
            </p>
          ))}
        </div>
      </div>
      <hr />

      {/* statistics */}
      <div className="lg:space-y-5 space-y-3">
        <div className="flex items-center gap-x-4">
          <Image src={icon1} alt="icon1"></Image>
          <div className="text-lg font-medium text-primary-black">
            <h4>Completed Sits</h4>
            <p>{data?.babysitter?.bookings}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Image src={icon2} alt="icon1"></Image>
          <div className="text-lg font-medium text-primary-black">
            <h4>Age</h4>
            <p>{data?.babysitter?.age} year</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Image src={icon3} alt="icon1"></Image>
          <div className="text-lg font-medium text-primary-black">
            <h4>Experience with babysitting </h4>
            <p>{data?.babysitter?.experience} years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
