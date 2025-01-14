"use client";
import { Button } from "@/components/ui/button";
import icon2 from "@/assets/icons/sitter/sitterPageIcon5.png";
import icon3 from "@/assets/icons/sitter/sitterPageIcon6.png";
import icon4 from "@/assets/icons/sitter/sitterPageIcon7.png";
import Image from "next/image";
import { FileUser, Mail, MessageCircleMore, Phone } from "lucide-react";
import Link from "next/link";
import { TBabysitterUser } from "@/types";
import icon6 from "@/assets/icons/locationIcon.png";
import { useAppSelector } from "@/redux/hooks";

const ProfileInfo = ({ data }: { data: TBabysitterUser }) => {
  const user: any = useAppSelector((state) => state.auth.user);

  return (
    <div className="lg:space-y-10 space-y-5">
      {/* Contact Button */}
      {user?.role === "FAMILY_USER" && (
        <Link href={"/message"}>
          <Button className="w-full py-6 bg-primary-orange group hover:bg-primary-orange/75 group">
            <MessageCircleMore className="mr-2 group-hover:animate-ping" />{" "}
            Contact {data?.babysitter?.firstName}
          </Button>
        </Link>
      )}

      {/* about the sitter */}
      <div className="lg:space-y-6 space-y-3">
        <h4 className="text-3xl text-primary-blue font-medium">About Me</h4>

        <div className="bg-[#F3F4F4] rounded-2xl lg:py-10 py-5 space-y-4">
          {/* <div className="px-8 flex justify-between items-center">
            <div className=" flex gap-x-4">
              <Image src={icon1} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Car</p>
            </div>
            <h3 className="font-medium text-primary-blue">No</h3>
          </div>
          <hr /> */}
          {data?.babysitter?.resume && (
            <>
              <div className="md:px-8 px-4 flex gap-x-2 justify-between items-center">
                <div className=" flex gap-x-4">
                  <FileUser color="#fe6a79" size={20}></FileUser>
                  <p className="text-[#707071] font-medium">Resume</p>
                </div>
                <Link
                  href={data?.babysitter?.resume}
                  download={true}
                  target="_blank"
                >
                  <span className="bg-primary-blue rounded-full px-3 text-white">
                    View
                  </span>
                </Link>
              </div>
              <hr />
            </>
          )}

          <div className="md:px-8 px-4 flex gap-x-2 justify-between items-center">
            <div className=" flex gap-x-4">
              <Mail color="#fe6a79" size={20}></Mail>
              <p className="text-[#707071] font-medium">Mail</p>
            </div>
            <h3 className="font-medium text-primary-blue">{data?.email}</h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex gap-x-2 justify-between items-center">
            <div className=" flex gap-x-4">
              <Phone color="#fe6a79" size={20}></Phone>
              <p className="text-[#707071] font-medium">Mobile</p>
            </div>
            <h3 className="font-medium text-primary-blue">
              {data?.babysitter?.mobileNumber}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex gap-x-2 justify-between items-center">
            <div className=" flex gap-x-4">
              <Image src={icon2} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Languages</p>
            </div>
            <h3 className="font-medium text-primary-blue">
              {data?.babysitter?.languages}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex gap-x-2 justify-between  items-center">
            <div className=" flex gap-x-4">
              <Image src={icon3} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Education</p>
            </div>
            <h3 className="font-medium text-primary-blue max-w-[50%] text-end">
              {data?.babysitter?.education}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex gap-x-2 justify-between items-center">
            <div className=" flex gap-x-4">
              <Image src={icon4} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Occupation</p>
            </div>
            <h3 className="font-medium text-primary-blue">
              {data?.babysitter?.occupation}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex flex-wrap md:flex-nowrap xl:flex-nowrap  justify-between  gap-x-10">
            <div className=" flex gap-x-2 ">
              <Image src={icon6} alt="icon" className="h-fit size-6"></Image>
              <p className="text-[#707071] font-medium">Location</p>
            </div>
            <h3 className="font-medium text-sm text-primary-blue">
              {data?.houseNo && data?.houseNo + " No. House,"} {data?.area},{" "}
              {data?.city}, {data?.state}{" "}
              {data?.zipCode && ", " + data?.zipCode}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
