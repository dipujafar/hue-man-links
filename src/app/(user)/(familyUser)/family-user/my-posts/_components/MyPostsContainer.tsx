"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import {
  useDeleteJobMutation,
  useGetUserJobPostQuery,
} from "@/redux/api/jobsApi";

import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import MyPostCard from "./MyPostCard";
import { TError, TJobPost } from "@/types";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Error_Modal } from "@/components/modals/modals";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
const MyPostsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 10;

  const query: Record<string, string | number> = {};
  query["page"] = currentPage;
  query["limit"] = pagePostsLimit;

  const { data: JobPostData, isLoading: isJobPostLoading } =
    useGetUserJobPostQuery(query || undefined);
  const meta = JobPostData?.meta;

  const [deleteJob, { isLoading: isDeletingJob }] = useDeleteJobMutation();

  const handleDeletedPost = async (id: string) => {
    const JobData = JobPostData?.data?.find((job: TJobPost) => job?.id === id);
    if (JobData?.status === "PENDING") {
      toast.error("This job is already on pending. You can't delete this job.");
      return;
    }
    if (JobData?.status === "COMPLETED") {
      toast.error("This job is already completed. You can't delete this job.");
      return;
    }

    try {
      toast.loading("Deleting...", { id: "delete" });
      await deleteJob(id);
      toast.success("Post deleted successfully.", { id: "delete" });
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return isJobPostLoading ? (
    <div className="space-y-5">
      {Array.from({ length: pagePostsLimit }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  ) : (
    <div>
      <motion.div
        variants={parentVariants}
        animate="animate"
        initial="initial"
        exit="exit"
        viewport={{ once: true }}
        className="grid grid-cols-1  mx-auto gap-y-10 "
      >
        {JobPostData?.data?.map((jobData: TJobPost, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5 relative"
          >
            <Link href={`/post-details?postId=${jobData?.id}`}>
              <MyPostCard data={jobData}></MyPostCard>
            </Link>
            <div className="absolute lg:-top-10 -top-2 right-2 ">
              {}
              <Button
                type="button"
                className="p-2 bg-primary-gray/30 rounded-full duration-300"
                onClick={() => handleDeletedPost(jobData?.id)}
              >
                <Trash2 size={20} color="#fc0133"></Trash2>
              </Button>
            </div>
            {index !== JobPostData?.data?.length - 1 && <hr />}
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-10 text-end  xl:w-[70%] mx-auto">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={meta?.total}
          pageNeighbours={2}
        />
      </div>
    </div>
  );
};

export default MyPostsContainer;
