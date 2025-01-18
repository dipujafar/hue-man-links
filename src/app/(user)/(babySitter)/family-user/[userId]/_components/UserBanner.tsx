import Image from "next/image";
import familyUserProfile from "@/assets/Images/familyUserImage.png";
import { TFamilyUserData } from "@/types";

const UserBanner = ({ data }: { data: TFamilyUserData }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center lg:gap-x-16 gap-x-10 gap-y-3 py-8 bg-gradient-to-r from-[#038C7F] to-[#558399] px-5 relative rounded">
      {/* profile Image */}
      <Image
        src={data?.profilePicture}
        alt="Sitter Profile Image"
        width={1900}
        height={1600}
        className="lg:size-56 size-32 rounded-full border border-primary-blue"
      ></Image>

      {/* profile details */}
      <div className="text-primary-white flex flex-col items-center md:gap-y-1 gap-y-2">
        <h1 className="lg:text-5xl text-2xl font-medium">
          {data?.familyUser?.personName}
        </h1>
        <p className="lg:text-lg text-center">
          Live in {data?.zipCode}, {data?.city}
        </p>
      </div>
    </div>
  );
};

export default UserBanner;
