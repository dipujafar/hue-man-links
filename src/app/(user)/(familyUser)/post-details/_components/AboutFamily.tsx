"use client";
import icon2 from "@/assets/icons/sitter/sitterPageIcon5.png";
import icon3 from "@/assets/icons/user/petIcon.png";
import icon4 from "@/assets/icons/locationIcon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { TError, TSingleJobPost } from "@/types";
import {
  useApplyJobMutation,
  useDeleteJobApplicationMutation,
} from "@/redux/api/babySitterJobs";
import {
  ConfirmModal,
  Error_Modal,
  Success_model,
} from "@/components/modals/modals";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutFamily = ({ data }: { data: TSingleJobPost }) => {
  const user: any = useAppSelector((state) => state.auth.user);
  const status = useSearchParams().get("status");
  const [applyJob, { isLoading: isApplyJobLoading }] = useApplyJobMutation();
  const router = useRouter();
  const applicationId = useSearchParams().get("appliedId");
  const [deleteJobStatus, { isLoading: isCancelRequestLoading }] =
    useDeleteJobApplicationMutation();

  const handleApplyJobs = async () => {
    try {
      await applyJob({ jobId: data?.id }).unwrap();
      Success_model({ title: "Applied Successfully" });
      router.replace("/book-request");
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  const handleCancelRequest = async () => {
    ConfirmModal(
      "Are you sure?",
      "You won't be cancel this request!",
      "Confirm"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteJobStatus(applicationId).unwrap();
          Success_model({ title: "Cancelled Successfully" });
          router.replace("/all-job-posts");
        } catch (error: TError | any) {
          Error_Modal({ title: error?.data?.message });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex gap-x-2">
        {user?.role !== "FAMILY_USER" &&
          status !== "false" &&
          (status === "applied" ? (
            <Button
              onClick={handleCancelRequest}
              className="mb-5 w-full py-6 bg-primary-orange group hover:bg-primary-orange/75"
            >
              {isCancelRequestLoading && (
                <LoadingSpain color="#fff" className="mr-2" />
              )}
              Cancel Request
            </Button>
          ) : (
            <Button
              disabled={isApplyJobLoading}
              onClick={handleApplyJobs}
              className="mb-5 w-1/2 py-6 bg-primary-orange group hover:bg-primary-orange/75"
            >
              {isApplyJobLoading && (
                <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
              )}
              Apply Job
            </Button>
          ))}

        {user?.role !== "FAMILY_USER" && (
          <Link href={`/message?userFrom=${data?.userId}`} className="w-1/2">
            <Button className="w-full py-6 bg-primary-orange group hover:bg-primary-orange/75">
              <MessageCircleMore className="mr-2 group-hover:animate-ping" />
              Message
            </Button>
          </Link>
        )}
      </div>

      <div className="lg:space-y-6 space-y-3">
        <h4 className="md:text-3xl text-xl text-primary-blue font-medium">
          About our family
        </h4>
        <div className="bg-[#F3F4F4] rounded-2xl lg:py-10 py-5 space-y-4">
          <div className="md:px-8 px-4 flex flex-wrap justify-between items-center gap-2">
            <div className=" flex gap-x-4">
              <Image src={icon2} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Languages we speak</p>
            </div>
            <h3 className="font-medium text-primary-blue">
              {data?.aboutFamily}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex flex-wrap justify-between items-center gap-2">
            <div className=" flex gap-x-4">
              <Image src={icon3} alt="icon"></Image>
              <p className="text-[#707071] font-medium">Pets Details</p>
            </div>
            <h3 className="font-medium text-primary-blue max-w-[45%] text-end">
              {data?.petDetails}
            </h3>
          </div>
          <hr />
          <div className="md:px-8 px-4 flex flex-wrap md:flex-nowrap xl:flex-nowrap  justify-between  gap-x-10">
            <div className=" flex gap-x-2 ">
              <Image src={icon4} alt="icon" className="h-fit"></Image>
              <p className="text-[#707071] font-medium">Location</p>
            </div>
            <h3 className="font-medium text-sm text-primary-blue">
              {data?.zipCode}, {data?.city}
            </h3>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default AboutFamily;
