"use client";
import { useGetUserQuery } from "@/redux/api/userApi";
import ProfileDetails from "./ProfileDetails";
import ProfileInfo from "./ProfileInfo";
import SitterBanner from "./SitterBanner";
import SitterProfileReview from "./SitterProfileReview";
import DetailsPageSkeleton from "@/components/shared/DetailsPageSkeleton";

const SingleBabySitterContainer = ({ id }: { id: string }) => {
  const { data: babySitterData, isLoading: isBabySitterDataLoading } =
    useGetUserQuery(id, { skip: !id });

  return isBabySitterDataLoading ? (
    <DetailsPageSkeleton></DetailsPageSkeleton>
  ) : (
    <div className="lg:space-y-10 space-y-5">
      <SitterBanner data={babySitterData?.data}></SitterBanner>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:gap-x-14 gap-x-8 gap-y-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileDetails data={babySitterData?.data}></ProfileDetails>

          <div className="hidden lg:block">
            <SitterProfileReview
              data={babySitterData?.data?.reviewed}
              id={id}
            ></SitterProfileReview>
          </div>
        </div>
        <div>
          <ProfileInfo data={babySitterData?.data}></ProfileInfo>
        </div>
        <div className="lg:hidden block">
          <SitterProfileReview
            data={babySitterData?.data?.reviewed}
            id={id}
          ></SitterProfileReview>
        </div>
      </div>
    </div>
  );
};

export default SingleBabySitterContainer;
