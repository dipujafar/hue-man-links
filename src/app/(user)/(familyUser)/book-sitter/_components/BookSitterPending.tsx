import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import { Error_Modal } from "@/components/modals/modals";
import Empty from "@/components/shared/Empty";
import JobApplyCard from "@/components/shared/JobApplyCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateJobStatusMutation } from "@/redux/api/userJobsApi";
import { TError, TJobApplication } from "@/types";
import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const cancelOptions = [
  { label: "Sore Throat", value: "Sore Throat" },
  { label: "Upset Stomach", value: "Upset Stomach" },
  { label: "Fever (above 100°F)", value: "Fever (above 100°F)" },
  { label: "Diarrhea", value: "Diarrhea" },
  { label: "Mouth Sores", value: "Mouth Sores" },
  { label: "Ringworm", value: "Ringworm" },
  {
    label: "Hand, Foot, and Mouth Disease",
    value: "Hand, Foot, and Mouth Disease",
  },
  { label: "Discolored Runny Nose", value: "Discolored Runny Nose" },
  { label: "Cough or Congestion", value: "Cough or Congestion" },
  {
    label: "Discharge from Eyes, Nose, or Ears",
    value: "Discharge from Eyes, Nose, or Ears",
  },
  { label: "Difficulty Breathing", value: "Difficulty Breathing" },
  { label: "Any Contagious Illness", value: "Any Contagious Illness" },
  { label: "Something Else", value: "Something Else" },
];

const BookSitterPending = ({ data }: { data: TJobApplication[] }) => {
  const [updateJobStatus] = useUpdateJobStatusMutation();

  const [isCancelLoading, setIsCancelLoading] = useState<boolean>(false);
  const [isCompletedLoading, setIsCompletedLoading] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCancelJob = async (id: string) => {
    if (!cancelReason) {
      return toast.error("Please select cancel reason.");
    }

    try {
      setIsCancelLoading(true);
      await updateJobStatus({
        id,
        status: { status: "CANCELLED", rejectReason: cancelReason },
      });
      toast.info("Successfully cancelled the pending Request.");
      setIsCancelLoading(false);
      setCancelModalOpen(false);
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleCompletedJob = async (id: string, userId: string) => {
    try {
      toast.loading("Completing...", { id: "complete" });
      setIsCompletedLoading(true);
      await updateJobStatus({
        id,
        status: { status: "COMPLETED" },
      });
      toast.success("Successfully completed the job.", { id: "complete" });
      setIsCompletedLoading(false);
      router.push(`/all-babysitters/${userId}?status=completed`);
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
        viewport={{ once: true }}
        exit="exit"
        className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 "
      >
        {data?.map((jobApplyData, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5"
          >
            <JobApplyCard data={jobApplyData}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-x-2 gap-y-2 ">
                <div className="flex-1">
                  <Link
                    href={`/message?userFrom=${jobApplyData?.babysitter?.userId}`}
                  >
                    <Button className="w-full bg-primary-orange hover:bg-primary-gray group flex-1">
                      <MessageCircleMore
                        size={20}
                        className="mr-2 group-hover:animate-ping"
                      />
                      Message
                    </Button>
                  </Link>
                </div>
                <div
                  className="flex-1 w-full"
                  onClick={() =>
                    handleCompletedJob(
                      jobApplyData?.id,
                      jobApplyData?.babysitter?.userId
                    )
                  }
                >
                  <AnimatedButton
                    disabled={isCompletedLoading}
                    className="w-full  bg-primary-orange text-primary-white border-none hover:bg-primary-orange/75 "
                  >
                    Completed
                  </AnimatedButton>
                </div>
                {/* cancel button */}
                <div className="flex-1">
                  <Button
                    onClick={() => setCancelModalOpen(true)}
                    className="w-full bg-primary-orange hover:bg-primary-gray group"
                  >
                    Cancel
                  </Button>
                </div>

                <Dialog
                  open={cancelModalOpen}
                  onOpenChange={setCancelModalOpen}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription className="text-xl text-center text-primary-blue font-medium mt-5">
                        Why do you want to cancel this appointment?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-1.5">
                      <Label className="text-primary-black/80">
                        Cancel Reason
                      </Label>
                      <Select onValueChange={(e) => setCancelReason(e)}>
                        <SelectTrigger className="text-primary-black/80">
                          <SelectValue placeholder="Select a Reason" />
                        </SelectTrigger>
                        <SelectContent className="h-[300px] text-primary-black/80">
                          <SelectGroup>
                            {cancelOptions.map((option, index: number) => (
                              <SelectItem key={index} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Textarea
                          onChange={(e) => setReason(e.target.value)}
                          rows={8}
                          placeholder="write here cancel issue"
                        ></Textarea>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="w-full bg-primary-orange"
                        onClick={() => handleCancelJob(jobApplyData.id)}
                        disabled={isCancelLoading}
                      >
                        {isCancelLoading && (
                          <LoadingSpain
                            color="#fff"
                            className="mr-2"
                          ></LoadingSpain>
                        )}
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </JobApplyCard>

            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Pending Jobs"></Empty>
  );
};

export default BookSitterPending;
