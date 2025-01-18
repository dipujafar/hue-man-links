import MovementElement from "@/animation/MovementElement";
import InfoDynamicCard from "./InfoDynamicCard";

const PlanCards2 = () => {
  return (
    <div className="space-y-14">
      {/* card 1 */}
      <div id="PLUS">
        <MovementElement duration={0.4} y="-10%">
          <InfoDynamicCard
            className="bg-[#2E3559] text-primary-white space-y-6   border-b-[6px] border-b-[#BEC0CC] border-r-[6px] border-r-[#BEC0CC]"
            title="Connection Plus"
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
          </InfoDynamicCard>
        </MovementElement>
      </div>
      {/* card 2 */}
      <div id="FULL_CIRCLE">
        <MovementElement delay={0.4} duration={0.4} y="-10%">
          <InfoDynamicCard
            className="bg-[#976FBF] text-primary-white space-y-6 px-5   border-b-[6px] border-b-[#DFD2EB] border-r-[6px] border-r-[#DFD2EB]"
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
          </InfoDynamicCard>
        </MovementElement>
      </div>
      {/* card 3 */}
      <div id="LIFELINE">
        <MovementElement delay={0.4} duration={0.4} y="-10%">
          <InfoDynamicCard
            className="bg-[#F26D6D] text-primary-white space-y-6 px-5   border-b-[6px] border-b-[#FBD2D2] border-r-[6px] border-r-[#FBD2D2]"
            title="Connection Lifeline"
            subTitle="$250/Month + Linkers’ hourly rate Unlimited sits each month and 5 cancellation fees waived."
          >
            <p>
              This tier is ideal for families who require immediate access to
              sitting services, such as single-parent households, or parents who
              work non-traditional hours (e.g., night shifts, on-call jobs). It
              ensures that support is always available, even in emergencies,
              offering peace of mind and dependable care at any hour.
            </p>
          </InfoDynamicCard>
        </MovementElement>
      </div>
    </div>
  );
};

export default PlanCards2;
