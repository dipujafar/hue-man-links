"use client";
import InfoDynamicCard from "@/app/(public)/membership-pricing/_components/InfoDynamicCard";
import CancelSubscriptionAlert from "@/app/(user)/(familyUser)/family-user/plan/_components/CancelSubscriptionAlert";
import { ConfirmModal, Error_Modal } from "@/components/modals/modals";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetSubscriptionQuery,
  useUpdateSubscriptionMutation,
} from "@/redux/api/subscriptionApi";
import { TError } from "@/types";
import moment from "moment";
import { useRouter } from "next/navigation";
import React from "react";

const ManageSubscriptionContainer = () => {
  const { data: subscription, isLoading } = useGetSubscriptionQuery(undefined);
  const [updateSubscription, { isLoading: isUpdateLoading }] =
    useUpdateSubscriptionMutation();
  const router = useRouter();

  const handleUpgradePlan = async (plan: string) => {
    ConfirmModal(
      "Are you sure?",
      "You want to upgrade your subscription.",
      "Confirm"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateSubscription({
            membership: plan,
            subscriptionId: subscription?.data?.id,
          }).unwrap();
          if (res?.success) {
            router.push(res?.data?.paymentLink);
          }
        } catch (error: TError | any) {
          Error_Modal({ title: error?.data?.message });
        }
      }
    });
  };
  return isLoading ? (
    <div className="min-h-[calc(100vh-500px)] flex items-center justify-center max-w-md mx-auto">
      <Skeleton className="h-[400px] w-full bg-gray-300">
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
        <Skeleton className="h-[40px] w-full bg-gray-400 mt-5 px-10"></Skeleton>
      </Skeleton>
    </div>
  ) : (
    <div className="max-w-md mx-auto flex items-center justify-center xl:min-h-[calc(100vh-300px)]">
      <InfoDynamicCard
        className="bg-[#5B4373] text-primary-white space-y-3   border-b-[6px] border-b-[#FBD2D2] border-r-[6px] border-r-[#FBD2D2]"
        title="Monthly Subscription"
        subTitle="$10/Month "
      >
        <div className="mt-5 xl:mt-10">
          <p className="text-lg font-light">
            you can apply for as many jobs as you like!you can apply for as many
            jobs as you like!
          </p>
          <div className="mx-auto flex items-center justify-center flex-wrap gap-2 mt-10 px-9">
            <Button
              onClick={() => handleUpgradePlan("SITTER")}
              variant={"outline"}
              className="bg-transparent"
            >
              Renew
            </Button>
            <div className="">
              <CancelSubscriptionAlert></CancelSubscriptionAlert>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="font-semibold">EXP. Date: </span>{" "}
          {moment(subscription?.data?.renewalDate).format("LL")}
        </div>
      </InfoDynamicCard>
    </div>
  );
};

export default ManageSubscriptionContainer;
