import { cn } from "@/lib/utils";
import MembershipPlan from "./MembershipPlan";
import PlanCards from "./PlanCards";
import PlanCards2 from "./PlanCards2";

const MembershipPlanContainer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 xl:grid-cols-3 justify-between items-center xl:gap-x-8 gap-y-14",
        className
      )}
    >
      <div className="col-span-2 grid grid-cols-1 xl:grid-cols-2 justify-between items-center xl:gap-x-8 gap-y-14">
        <MembershipPlan></MembershipPlan>
        <PlanCards></PlanCards>
        <p className="xl:col-span-2 max-w-3xl font-medium text-xl hidden xl:block">
          <span className="font-semibold"> Note: </span>Any counties outside of
          Fulton, Dekalb, Gwinnett, and Clayton require a $25 travel fee paid
          directly to the sitter for each sit.
        </p>
      </div>

      <PlanCards2></PlanCards2>
    </div>
  );
};

export default MembershipPlanContainer;
