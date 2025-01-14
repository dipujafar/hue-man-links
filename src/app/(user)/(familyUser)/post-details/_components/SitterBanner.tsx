import Image from "next/image";
import Link from "next/link";
type TUser = {
  address: string;
  familyUser: {
    personName: string;
    personPhoneNumber: string;
  };
  profilePicture: string;
  id: string;
};

const SitterBanner = ({ data, status }: { data: TUser; status: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center lg:gap-x-10 gap-x-6 gap-y-5 md:py-8 py-5 bg-gradient-to-r from-[#038C7F] to-[#558399] px-5 relative rounded">
      {/* profile Image */}
      <Link
        href={`/family-user/${data?.id}?${
          status === "COMPLETED" && "status=completed"
        }`}
      >
        <Image
          src={data?.profilePicture}
          alt="Sitter Profile Image"
          width={1900}
          height={1600}
          className="lg:size-56 md:size-44 size-32 rounded-full border border-primary-blue"
        ></Image>
      </Link>
      {/* profile details */}
      <div className="text-primary-white flex flex-col items-center gap-y-5">
        <Link
          href={`/family-user/${data?.id}?${
            status === "COMPLETED" && "status=completed"
          }`}
        >
          <h1 className="lg:text-5xl text-3xl font-medium">
            {data?.familyUser?.personName}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default SitterBanner;
