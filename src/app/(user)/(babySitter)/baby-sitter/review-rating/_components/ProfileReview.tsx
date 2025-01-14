"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import ReviewCard from "@/components/shared/ReviewCard";
import { Button } from "@/components/ui/button";
import { TReview } from "@/types";
import { sitterReviews } from "@/utils/sitterReviews";
import { motion } from "framer-motion";
import { useState } from "react";
const ProfileReview = ({ data }: { data: TReview[] }) => {
  const [showFeedbacks, setShowFeedbacks] = useState(4);
  return (
    <>
      <motion.div
        variants={parentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        viewport={{ once: true }}
        className="mt-16 md:mt-6 flex flex-col gap-y-5"
      >
        {data?.slice(0, showFeedbacks)?.map((review, index) => (
          <motion.div variants={childrenVariants} key={index}>
            <ReviewCard review={review}></ReviewCard>
          </motion.div>
        ))}
      </motion.div>
      {4 < data?.length && (
        <div className="mt-5 flex justify-end">
          {showFeedbacks > data?.length ? (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setShowFeedbacks(4)}
              disabled={showFeedbacks <= 4}
            >
              Show {showFeedbacks <= 4 ? "more" : "less"}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="rounded-full"
              disabled={showFeedbacks > data?.length}
              onClick={() => setShowFeedbacks(showFeedbacks + 4)}
            >
              Show more
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileReview;
