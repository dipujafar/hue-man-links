"use client";
import InfoDynamicCard from "@/app/(public)/membership-pricing/_components/InfoDynamicCard";
import { Error_Modal } from "@/components/modals/modals";
import { Button } from "@/components/ui/button";
import { useUpdateSubscriptionMutation } from "@/redux/api/subscriptionApi";
import { TError } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

const UpgradePlanContainer = () => {
  const [updateSubscription, { isLoading }] = useUpdateSubscriptionMutation();
  const router = useRouter();
  const id = useSearchParams()?.get("id");
  console.log(id);

  const handleUpgradePlan = async (plan: string) => {
    try {
      const res = await updateSubscription({
        membership: plan,
        subscriptionId: id,
      }).unwrap();
      if (res?.success) {
        router.push(res?.data?.paymentLink);
      }
    } catch (error: TError | any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div className=" flex flex-col lg:gap-y-8 gap-4 justify-center items-center">
      <h1 className="w-full text bg-deep-blue rounded text-primary-white text-center lg:text-3xl text-xl py-2 font-medium px-2">
        Upgrade Plan
      </h1>
      <p className="max-w-5xl text-center font-medium text-primary-black">
        Upgrade your plan based on your specific needs. With a paid membership,
        you can easily connect with potential clients and increase engagement,
        ensuring better communication and higher response rates for your
        business.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-9">
        {/* plan 1 */}
        <div className="max-w-md">
          <InfoDynamicCard
            className="bg-[#5B4373] text-primary-white space-y-3   border-b-[6px] border-b-[#FBD2D2] border-r-[6px] border-r-[#FBD2D2] lg:h-[510px] relative"
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
                <li>
                  - Access to sitters a limited number of times per month{" "}
                </li>
                <li>
                  - Flexibility to schedule as needed without long- term
                  commitments
                </li>
                <li>
                  - Access to the same level of professionalism and care from
                  sitters
                </li>
              </ul>
              <div className="w-[80%] mx-auto  mt-5 lg:absolute lg:bottom-5 lg:left-1/2 lg:right-1/2 lg:-translate-x-1/2">
                <Button
                  disabled={isLoading}
                  className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold"
                  onClick={() => handleUpgradePlan("SOMETIMES")}
                >
                  Choose Plan
                </Button>
              </div>
            </div>
          </InfoDynamicCard>
        </div>

        {/* plan 2 */}
        <div className="max-w-md h-[510px]">
          <InfoDynamicCard
            className="bg-[#976FBF] text-primary-white px-5 border-b-[6px] border-b-[#DFD2EB] border-r-[6px] border-r-[#DFD2EB] h-full flex flex-col  gap-y-5 relative"
            title="Full Circle Connection"
            subTitle="$150/Month + Linkers’ hourly rate Unlimited sits each month"
          >
            <p>
              For families requiring comprehensive, around-the-clock support.
              This tier is tailored for busy families who rely on sitting
              services regularly, whether for work, school, or other
              commitments. It includes unlimited access, priority. It's
              especially useful for families with unpredictable or demanding
              schedules.
            </p>

            <div className="w-[80%] mx-auto  mt-5 absolute bottom-5 left-1/2 right-1/2 -translate-x-1/2">
              <Button
                onClick={() => handleUpgradePlan("FULL_CIRCLE")}
                disabled={isLoading}
                className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold"
              >
                Choose Plan
              </Button>
            </div>
          </InfoDynamicCard>
        </div>

        {/* plan 3 */}
        <div className="max-w-md">
          <InfoDynamicCard
            className="bg-[#038C7F] text-primary-white space-y-6 px-5   border-b-[6px] border-b-[#B1DBD7] border-r-[6px] border-r-[#B1DBD7]"
            title="Connection Starter"
            freeTrail="First time will be free trial for book 5 sits in a month"
            subTitle="$50/Month + Linkers’ hourly rate Book 5 sits each month"
          >
            <p>
              For families seeking occasional sitting services. Ideal for new or
              small families who only need sitting services occasionally, such
              as date nights or errands. This tier provides access to basic
              services, making it a great entry point for families wanting
              trusted care without a heavy time commitment.
            </p>
            <div className="w-[80%] mx-auto mt-2">
              <Button
                disabled={isLoading}
                onClick={() => handleUpgradePlan("STARTER")}
                className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold"
              >
                Choose Plan
              </Button>
            </div>
          </InfoDynamicCard>
        </div>

        {/* plan 4 */}
        <div className="max-w-md">
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
            <div className="w-[80%] mx-auto mt-2">
              <Button
                disabled={isLoading}
                onClick={() => handleUpgradePlan("LIFELINE")}
                className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold"
              >
                Choose Plan
              </Button>
            </div>
          </InfoDynamicCard>
        </div>

        {/* plan 5 */}
        <div className="max-w-md">
          <InfoDynamicCard
            className="bg-[#2E3559] text-primary-white space-y-6   border-b-[6px] border-b-[#BEC0CC] border-r-[6px] border-r-[#BEC0CC]"
            title=" Connection Plus"
            subTitle="$100 Month + Linkers’ hourly rate Book 10 sits each month"
          >
            <p>
              For families needing more frequent sitting options. This tier is
              perfect for families with busier schedules, such as working
              parents or those with multiple children who need regular sitting.
              It offers more hours and flexibility, ensuring families have
              reliable access to sitters on a consistent basis, including during
              evenings or weekends.
            </p>
            <div className="w-[80%] mx-auto mt-2">
              <Button
                onClick={() => handleUpgradePlan("PLUS")}
                disabled={isLoading}
                className="w-full bg-primary-white text-primary-black hover:bg-primary-gray hover:text-primary-white font-semibold"
              >
                Choose Plan
              </Button>
            </div>
          </InfoDynamicCard>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanContainer;
