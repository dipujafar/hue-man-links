import UserProfileContainer from "./_components/UserProfileContainer";

export const metadata = {
  title: " User Details",
  description: "This is Family User Details Page",
};

const FamilyUserDetails = ({ params }: { params: { userId: string } }) => {
  return <UserProfileContainer id={params?.userId}></UserProfileContainer>;
};

export default FamilyUserDetails;
