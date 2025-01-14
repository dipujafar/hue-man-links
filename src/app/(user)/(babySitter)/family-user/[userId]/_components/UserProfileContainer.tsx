"use client";
import { useGetUserQuery } from "@/redux/api/userApi";
import ProfileReviewRating from "./ProfileReviewRating";
import UserBanner from "./UserBanner";
import UserProfileDetails from "./UserProfileDetails";
import UserProfileInfo from "./UserProfileInfo";
import DetailsPageSkeleton from "@/components/shared/DetailsPageSkeleton";

const UserProfileContainer = ({ id }: { id: string }) => {
  const { data: familyUserData, isLoading: isFamilyUserDataLoading } =
    useGetUserQuery(id, { skip: !id });

  return isFamilyUserDataLoading ? (
    <DetailsPageSkeleton></DetailsPageSkeleton>
  ) : (
    <div className="lg:space-y-16 space-y-8">
      <UserBanner data={familyUserData?.data}></UserBanner>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:gap-x-14 gap-x-8 gap-y-8">
        <div className="lg:col-span-2 space-y-8">
          <UserProfileDetails data={familyUserData?.data}></UserProfileDetails>
          <div className="hidden lg:block">
            <ProfileReviewRating
              data={familyUserData?.data?.reviewed}
            ></ProfileReviewRating>
          </div>
        </div>
        <div>
          <UserProfileInfo data={familyUserData?.data}></UserProfileInfo>
        </div>
        <div className="lg:hidden block">
          <ProfileReviewRating
            data={familyUserData?.data?.reviewed}
          ></ProfileReviewRating>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContainer;
