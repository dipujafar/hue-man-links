import MovementElement from "@/animation/MovementElement";
import InfoDynamicCard from "./InfoDynamicCard";

const PlanCards = () => {
  return (
    <div className="space-y-14">
      {/* card 1 */}
      <MovementElement duration={0.4} y="-10%">
        <div id="SOMETIMES">
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
                <li>
                  {" "}
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
            </div>
          </InfoDynamicCard>
        </div>
      </MovementElement>
      {/* card 2 */}
      <div id="STARTER">
        <MovementElement delay={0.4} duration={0.4} y="-10%">
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
          </InfoDynamicCard>
        </MovementElement>
      </div>
    </div>
  );
};

export default PlanCards;
