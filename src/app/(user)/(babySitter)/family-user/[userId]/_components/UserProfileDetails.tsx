import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import icon2 from "@/assets/icons/sitter/sitterPageIcon2.png";
import icon3 from "@/assets/icons/user/interestIcon.png";
import { TFamilyUserData } from "@/types";
import Image from "next/image";

const UserProfileDetails = ({ data }: { data: TFamilyUserData }) => {
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current month and day are before the birth month and day
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-x-14 gap-x-8 gap-y-8">
      {data?.familyUser?.clients?.map((client) => (
        <div key={client?.id} className="lg:space-y-5 space-y-3">
          <div className="flex items-center gap-x-4">
            <Image src={icon1} alt="icon1"></Image>
            <div className="text-lg font-medium text-primary-black">
              <h4>Child’s Name</h4>
              <p>{client?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Image src={icon2} alt="icon1"></Image>
            <div className="text-lg font-medium text-primary-black">
              <h4>Child's Age</h4>
              <p>{calculateAge(client?.dob)}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Image src={icon3} alt="icon1"></Image>
            <div className="text-lg font-medium text-primary-black">
              <h4>Child's Info</h4>
              <p className="max-w-[300px]">{client?.information}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfileDetails;
