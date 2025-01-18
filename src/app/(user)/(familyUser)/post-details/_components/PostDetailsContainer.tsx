"use client";
import { useSearchParams } from "next/navigation";
import AboutFamily from "./AboutFamily";
import PostInfo from "./PostInfo";
import SitterBanner from "./SitterBanner";
import { useSingleJobQuery } from "@/redux/api/jobsApi";
import DetailsPageSkeleton from "@/components/shared/DetailsPageSkeleton";

const PostDetailsContainer = () => {
  const postId = useSearchParams().get("postId");
  const { data: SinglePostData, isLoading: isPostDataLoading } =
    useSingleJobQuery(postId, {
      skip: !postId,
    });

  return isPostDataLoading ? (
    <DetailsPageSkeleton></DetailsPageSkeleton>
  ) : (
    <div className="lg:space-y-16 space-y-8">
      <SitterBanner
        data={SinglePostData?.data?.user}
        status={SinglePostData?.data?.status}
      ></SitterBanner>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:gap-x-14 gap-x-8 gap-y-8">
        <div className="lg:col-span-2 space-y-8">
          <PostInfo data={SinglePostData?.data}></PostInfo>
        </div>
        <div>
          <AboutFamily data={SinglePostData?.data}></AboutFamily>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsContainer;
