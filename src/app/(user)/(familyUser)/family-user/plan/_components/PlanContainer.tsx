"use client";
import InfoDynamicCard from "@/app/(public)/membership-pricing/_components/InfoDynamicCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CancelSubscriptionAlert from "./CancelSubscriptionAlert";
import { useGetSubscriptionQuery } from "@/redux/api/subscriptionApi";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";

const PlanContainer = () => {
  const { data: subscription, isLoading } = useGetSubscriptionQuery(undefined);
  console.log(subscription);

  return isLoading ? (
    <div className="space-y-3">
      <Skeleton className="h-10"></Skeleton>
      <Skeleton className="h-4"></Skeleton>
      <Skeleton className="h-4"></Skeleton>
      <div className="max-w-md mx-auto mt-5">
        <Skeleton className="h-[400px]"></Skeleton>
      </div>
    </div>
  ) : (
    <div className=" flex flex-col lg:gap-y-8 gap-4 justify-center items-center">
      <h1 className="lg:text-5xl text-3xl font-bold text-primary-orange">
        My <span className="text-primary-blue ">Plan</span>
      </h1>
      <h1 className="w-full text bg-deep-blue rounded text-primary-white text-center lg:text-3xl text-xl py-2 font-medium px-2">
        {subscription?.data?.membership === "SOMETIMES" && "Connect Sometimes"}
        {subscription?.data?.membership === "FULL_CIRCLE" &&
          "Full Circle Connection"}
        {subscription?.data?.membership === "STARTER" && "Connection Starter"}
        {subscription?.data?.membership === "LIFELINE" && "Connection Lifeline"}
        {subscription?.data?.membership === "PLUS" && "Connection Plus"}
      </h1>
      <div>
        <p className="max-w-5xl text-center font-medium text-primary-black">
          Upgrade your plan based on your specific needs. With a paid
          membership, you can easily connect with potential clients and increase
          engagement, ensuring better communication and higher response rates
          for your business.
        </p>
        <div className="text-center">
          <span className="font-semibold">EXP. Date: </span>{" "}
          {moment(subscription?.data?.renewalDate).format("LL")}
        </div>
      </div>
      <div
        className={cn(
          "max-w-md",
          subscription?.data?.membership !== "SOMETIMES" && "hidden"
        )}
      >
        <InfoDynamicCard
          className="bg-[#5B4373] text-primary-white space-y-3   border-b-[6px] border-b-[#FBD2D2] border-r-[6px] border-r-[#FBD2D2]"
          title="Connect Sometimes"
          subTitle="$25 per request + Linkers’ hourly rate"
        >
          <div className="space-y-3">
            <p>
              Membership is perfect for families who need flexible sitting
              support on an occasional basis. This tier offers access to our
              high-quality, vetted sitters without the commitment of frequent
              bookings.
            </p>
            <h5 className="font-medium">Benefits Includes</h5>
            <ul className="space-y-2">
              <li> - Access to sitters a limited number of times per month </li>
              <li>
                - Flexibility to schedule as needed without long- term
                commitments
              </li>
              <li>
                - Access to the same level of professionalism and care from
                sitters
              </li>
            </ul>
            <div className="mx-auto flex items-center justify-center flex-wrap gap-2">
              <Link
                href={`/family-user/upgrade-plan?id=${subscription?.data?.id}`}
              >
                <Button className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold ">
                  Upgrade or Downgrade
                </Button>
              </Link>

              <CancelSubscriptionAlert></CancelSubscriptionAlert>
            </div>
          </div>
        </InfoDynamicCard>
      </div>
      <div
        className={cn(
          "max-w-md",
          subscription?.data?.membership !== "FULL_CIRCLE" && "hidden"
        )}
      >
        <InfoDynamicCard
          className="bg-[#976FBF] text-primary-white px-5 border-b-[6px] border-b-[#DFD2EB] border-r-[6px] border-r-[#DFD2EB] h-full flex flex-col  gap-y-5"
          title="Full Circle Connection"
          subTitle="$150/Month + Linkers’ hourly rate Unlimited sits each month"
        >
          <p>
            For families requiring comprehensive, around-the-clock support. This
            tier is tailored for busy families who rely on sitting services
            regularly, whether for work, school, or other commitments. It
            includes unlimited access, priority. It's especially useful for
            families with unpredictable or demanding schedules.
          </p>

          <div className="mx-auto flex items-center justify-center flex-wrap gap-2 mt-2">
            <Link
              href={`/family-user/upgrade-plan?id=${subscription?.data?.id}`}
            >
              <Button className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold ">
                Upgrade or Downgrade
              </Button>
            </Link>

            <CancelSubscriptionAlert></CancelSubscriptionAlert>
          </div>
        </InfoDynamicCard>
      </div>
      <div
        className={cn(
          "max-w-md",
          subscription?.data?.membership !== "STARTER" && "hidden"
        )}
      >
        <InfoDynamicCard
          className="bg-[#038C7F] text-primary-white space-y-6 px-5   border-b-[6px] border-b-[#B1DBD7] border-r-[6px] border-r-[#B1DBD7]"
          title="Connection Starter"
          subTitle="$50/Month + Linkers’ hourly rate Book 5 sits each month"
        >
          <p>
            For families seeking occasional sitting services. Ideal for new or
            small families who only need sitting services occasionally, such as
            date nights or errands. This tier provides access to basic services,
            making it a great entry point for families wanting trusted care
            without a heavy time commitment.
          </p>
          <div className="mx-auto flex items-center justify-center flex-wrap gap-2 mt-2">
            <Link
              href={`/family-user/upgrade-plan?id=${subscription?.data?.id}`}
            >
              <Button className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold ">
                Upgrade or Downgrade
              </Button>
            </Link>

            <CancelSubscriptionAlert></CancelSubscriptionAlert>
          </div>
        </InfoDynamicCard>
      </div>
      <div
        className={cn(
          "max-w-md",
          subscription?.data?.membership !== "LIFELINE" && "hidden"
        )}
      >
        <InfoDynamicCard
          className="bg-[#F26D6D] text-primary-white space-y-6 px-5   border-b-[6px] border-b-[#FBD2D2] border-r-[6px] border-r-[#FBD2D2]"
          title="Connection Lifeline"
          subTitle="$250/Month + Linkers’ hourly rateUnlimited sits each month and 5 cancellation fees waived."
        >
          <p>
            This tier is ideal for families who require immediate access to
            sitting services, such as single-parent households, or parents who
            work non-traditional hours (e.g., night shifts, on-call jobs). It
            ensures that support is always available, even in emergencies,
            offering peace of mind and dependable care at any hour.
          </p>
          <div className="mx-auto flex items-center justify-center flex-wrap gap-2 mt-2">
            <Link
              href={`/family-user/upgrade-plan?id=${subscription?.data?.id}`}
            >
              <Button className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold ">
                Upgrade or Downgrade
              </Button>
            </Link>

            <CancelSubscriptionAlert></CancelSubscriptionAlert>
          </div>
        </InfoDynamicCard>
      </div>
      <div
        className={cn(
          "max-w-md",
          subscription?.data?.membership !== "PLUS" && "hidden"
        )}
      >
        <InfoDynamicCard
          className="bg-[#2E3559] text-primary-white space-y-6   border-b-[6px] border-b-[#BEC0CC] border-r-[6px] border-r-[#BEC0CC]"
          title=" Connection Plus"
          subTitle="$100 Month + Linkers’ hourly rate Book 10 sits each month"
        >
          <p>
            For families needing more frequent sitting options. This tier is
            perfect for families with busier schedules, such as working parents
            or those with multiple children who need regular sitting. It offers
            more hours and flexibility, ensuring families have reliable access
            to sitters on a consistent basis, including during evenings or
            weekends.
          </p>
          <div className="mx-auto flex items-center justify-center flex-wrap gap-2 mt-2">
            <Link
              href={`/family-user/upgrade-plan?id=${subscription?.data?.id}`}
            >
              <Button className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold ">
                Upgrade or Downgrade
              </Button>
            </Link>

            <CancelSubscriptionAlert></CancelSubscriptionAlert>
          </div>
        </InfoDynamicCard>
      </div>
    </div>
  );
};

export default PlanContainer;
