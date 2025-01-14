"use client";

import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import { useSearchParams } from "next/navigation";
import SendFeedback from "./SendFeedback";
import ReviewCard from "@/components/shared/ReviewCard";
import { TReview } from "@/types";
import Empty from "@/components/shared/Empty";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ProfileReviewRating = ({ data }: { data: TReview[] }) => {
  // const status = useSearchParams().get("status");
  const [showFeedbacks, setShowFeedbacks] = useState(4);

  return (
    <div>
      <h1 className="text-xl text-primary-blue font-medium mb-2">
        Reviews & Ratings
      </h1>
      <hr />

      {/* {status === "completed" && (
        <div className="mt-5">
          <SendFeedback></SendFeedback>
        </div>
      )} */}

      {data?.length ? (
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
      ) : (
        <Empty message="No Reviews"></Empty>
      )}
    </div>
  );
};

export default ProfileReviewRating;
