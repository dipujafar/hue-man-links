import { Button } from "@/components/ui/button";
import { Mail, MessageCircleMore, Phone } from "lucide-react";
import icon3 from "@/assets/icons/user/petIcon.png";
import icon4 from "@/assets/icons/locationIcon.png";
import Image from "next/image";
import Link from "next/link";
import { TFamilyUserData } from "@/types";

const UserProfileInfo = ({ data }: { data: TFamilyUserData }) => {
  return (
    <div className="lg:space-y-10 space-y-5">
      {/* Contact Button */}
      <Link href={"/message"}>
        <Button className="w-full py-6 bg-primary-orange group hover:bg-primary-orange/75">
          <MessageCircleMore className="mr-2 group-hover:animate-ping" />
          {data?.familyUser?.personName}
        </Button>
      </Link>

      {/* about the sitter */}
      <div className="lg:space-y-4 space-y-2">
        <h4 className="text-2xl text-primary-blue font-medium">
          About our family
        </h4>
        <div className="bg-[#F3F4F4] rounded-2xl lg:py-10 py-5 space-y-4">
          <div className="px-8 flex justify-between gap-x-2 items-center">
            <div className=" flex gap-x-4">
              <Mail color="#f26d6f" size={20}></Mail>
              <p className="text-[#707071] font-medium">Mail</p>
            </div>
            <h3 className="font-medium text-primary-blue text-end">
              {data?.email}
            </h3>
          </div>
          <hr />
          <div className="px-8 flex justify-between gap-x-2 items-center">
            <div className=" flex gap-x-4">
              <Phone color="#f26d6f" size={20}></Phone>
              <p className="text-[#707071] font-medium">Mobile</p>
            </div>
            <h3 className="font-medium text-primary-blue text-end">
              {data?.familyUser?.personPhoneNumber}
            </h3>
          </div>
          <hr />
          <div className="px-8 flex justify-between gap-x-2 items-center">
            <div className=" flex gap-x-4">
              <Image src={icon3} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Number of pets</p>
            </div>
            <h3 className="font-medium text-primary-blue  text-end">
              {data?.familyUser?.petCount}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex flex-wrap md:flex-nowrap xl:flex-nowrap  justify-between  gap-x-10">
            <div className=" flex gap-x-2 ">
              <Image src={icon4} alt="icon" className="h-fit"></Image>
              <p className="text-[#707071] font-medium">Location</p>
            </div>
            <h3 className="font-medium text-sm text-primary-blue">
              {data?.houseNo && data?.houseNo + " No. House,"} {data?.area},{" "}
              {data?.city}, {data?.state}{" "}
              {data?.zipCode && ", " + data?.zipCode}
            </h3>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
