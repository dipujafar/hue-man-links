"use client";
import { Progress } from "@/components/ui/progressbar";
import { Star } from "lucide-react";
import React from "react";
import ProfileReview from "./ProfileReview";
import { useGetUserReviewQuery } from "@/redux/api/reviewApi";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { TReview } from "@/types";

const ReviewRatingContainer = () => {
  const { data: userData, isLoading: isUserDataLoading } =
    useGetUserProfileQuery(undefined);
  const { data: reviewData, isLoading: isReviewDataLoading } =
    useGetUserReviewQuery(undefined);
  const reviews = reviewData?.data?.data;

  console.log(reviews);

  const totalRating = reviews?.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );

  const rating5 = reviews?.filter((review: TReview) => review?.rating >= 5);

  const totalRating5 = rating5?.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );

  const rating4 = reviews?.filter(
    (review: TReview) => review?.rating >= 4 && review?.rating < 5
  );

  const totalRating4 = rating4?.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );

  const rating3 = reviews?.filter(
    (review: TReview) => review?.rating >= 3 && review?.rating < 4
  );

  const totalRating3 = rating3?.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );

  const rating2 = reviews?.filter(
    (review: TReview) => review?.rating >= 2 && review?.rating < 3
  );

  const totalRating2 = rating2?.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );

  const rating1 = reviews?.filter(
    (review: TReview) => review?.rating >= 1 && review?.rating < 2
  );

  const totalRating1 = rating1?.reduce(
    (acc: number, review: TReview) => acc + review?.rating,
    0
  );

  return (
    <div className="space-y-10">
      <div className="flex md:flex-row flex-col justify-center  gap-x-16 gap-y-5">
        <div className="mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-5xl font-medium">
              {userData?.data?.babysitter?.avgRating}
            </h1>
            <Star fill="#000" size={40}></Star>
          </div>
          <div className="mt-4 w-fit">
            <p>{totalRating} Ratings</p>
            <p className="text-center">&</p>
            <p className="text-center">
              {userData?.data?.babysitter?.reviewCount} Reviews
            </p>
          </div>
        </div>

        {/* previous ratings */}
        <div className="flex-1">
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">5</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={totalRating5 || 0}
              totalValue={totalRating || 0}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">4</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={totalRating4 || 0}
              totalValue={totalRating || 0}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">3</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={totalRating3 || 0}
              totalValue={totalRating || 0}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">2</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={totalRating2 || 0}
              totalValue={totalRating || 0}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
          <div className="flex items-center gap-14">
            <div className="flex gap-1 text-[#F8B84E]">
              <h1 className="text-xl font-medium">1</h1>
              <Star fill="#F8B84E" />
            </div>
            <Progress
              value={totalRating1 || 0}
              totalValue={totalRating || 0}
              className="max-h-[14px] max-w-[600px]"
            ></Progress>
          </div>
        </div>
      </div>

      {/* reviews */}
      <ProfileReview data={reviews}></ProfileReview>
    </div>
  );
};

export default ReviewRatingContainer;
