"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import JobCard from "@/components/shared/JobCard";
import { TBabysittingRequest, TError } from "@/types";
import Empty from "@/components/shared/Empty";

import {
  ConfirmModal,
  Error_Modal,
  Success_model,
} from "@/components/modals/modals";
import { useDeleteJobApplicationMutation } from "@/redux/api/babySitterJobs";
import { toast } from "sonner";

const BookRequests = ({ data }: { data: TBabysittingRequest[] }) => {
  const [deleteJobStatus, { isLoading }] = useDeleteJobApplicationMutation();

  const handleCancelRequest = async (id: string) => {
    ConfirmModal(
      "Are you sure?",
      "You won't be cancel this request!",
      "Confirm"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          toast.loading("Cancelling...", { id: "cancel" });
          const res = await deleteJobStatus(id).unwrap();
          toast.success("Cancelled Successfully", { id: "cancel" });
        } catch (error: TError | any) {
          Error_Modal({ title: error?.data?.message });
        }
      }
    });
  };

  return data?.length ? (
    <div>
      <motion.div
        variants={parentVariants}
        animate="animate"
        initial="initial"
        exit="exit"
        viewport={{ once: true }}
        className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 "
      >
        {data?.map((jobData, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5"
          >
            <Link
              href={`/post-details?postId=${jobData?.jobPost?.id}&status=applied&appliedId=${jobData?.id}`}
              className="w-full"
            >
              <JobCard data={jobData?.jobPost}>
                <div className="flex gap-x-4 gap-y-2 flex-col md:flex-row ">
                  {/* message button */}
                  <div className="flex-1">
                    <Link href={"/message"}>
                      <Button className="w-full bg-primary-orange hover:bg-primary-gray group">
                        <MessageCircleMore
                          size={20}
                          className="mr-2 group-hover:animate-ping"
                        />
                        Message
                      </Button>
                    </Link>
                  </div>

                  {/* Approved button */}
                  <Link href={""} className="flex-1">
                    <Button
                      disabled={isLoading}
                      onClick={() => handleCancelRequest(jobData?.id)}
                      type="button"
                      className="w-full bg-primary-orange hover:bg-primary-gray group flex-1 z-10"
                    >
                      Cancel Request
                    </Button>
                  </Link>
                </div>
              </JobCard>
            </Link>

            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Request Jobs"></Empty>
  );
};

export default BookRequests;
