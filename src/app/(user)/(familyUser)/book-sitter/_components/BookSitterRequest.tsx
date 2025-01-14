import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import { Error_Modal } from "@/components/modals/modals";
import Empty from "@/components/shared/Empty";
import JobApplyCard from "@/components/shared/JobApplyCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateJobStatusMutation } from "@/redux/api/userJobsApi";
import { TError, TJobApplication } from "@/types";
import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const BookSitterRequest = ({ data }: { data: TJobApplication[] }) => {
  const [updateJobStatus] = useUpdateJobStatusMutation();
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonModalOpen, setReasonModalOpen] = useState<boolean>(false);

  const handleApproveJob = async (id: string) => {
    try {
      setIsApproveLoading(true);
      toast.loading("Approving...", { id: "approve" });
      await updateJobStatus({ id, status: { status: "APPROVED" } });
      toast.success(
        "Approved Successfully. The sitter will received an email.",
        {
          id: "approve",
        }
      );
      setIsApproveLoading(false);
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleRejectJob = async (id: string) => {
    try {
      setIsRejectLoading(true);
      await updateJobStatus({
        id,
        status: { status: "CANCELLED", rejectReason: reason },
      });
      toast.info("Rejected the request successfully.");
      setIsRejectLoading(false);
      setReasonModalOpen(false);
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
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
        {data?.map((jobApplyData, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5"
          >
            <JobApplyCard data={jobApplyData}>
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

                {/* Reject button */}

                <div className="flex-1">
                  <Button
                    onClick={() => setReasonModalOpen(true)}
                    className="w-full bg-primary-orange hover:bg-primary-gray group"
                  >
                    Reject
                  </Button>
                </div>

                {/* Reject modal */}
                <Dialog
                  open={reasonModalOpen}
                  onOpenChange={setReasonModalOpen}
                >
                  <DialogContent className="sm:max-w-[425px] ">
                    <DialogHeader>
                      <DialogDescription className=" text-center text-primary-blue font-medium mt-5">
                        Why do you want to reject this Request?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Textarea
                          className=""
                          rows={7}
                          placeholder="write here reject issue"
                          onChange={(e) => setReason(e.target.value)}
                        ></Textarea>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={isRejectLoading}
                        type="submit"
                        className="w-full bg-primary-orange"
                        onClick={() => handleRejectJob(jobApplyData?.id)}
                      >
                        {isRejectLoading && (
                          <LoadingSpain
                            color="#fff"
                            className="ml-2"
                          ></LoadingSpain>
                        )}
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Approved button */}
                <Button
                  onClick={() => handleApproveJob(jobApplyData?.id)}
                  className="w-full bg-primary-orange hover:bg-primary-gray group flex-1"
                  disabled={isApproveLoading}
                >
                  Approved
                </Button>
              </div>
            </JobApplyCard>

            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Request Jobs"></Empty>
  );
};

export default BookSitterRequest;
