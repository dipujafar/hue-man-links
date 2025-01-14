const MembershipPlan = () => {
  return (
    <div className="lg:space-y-16 space-y-8">
      <h1 className="text-4xl text-primary-orange text-center font-semibold">
        Membership Plan
      </h1>
      <div className="space-y-12 text-xl">
        <p>
          Hue-man Links Incorporated is a monthly membership sitting agency that
          gives members access to qualified and verified linkers in the metro
          Atlanta area.
        </p>

        <div className="space-y-3">
          <h1>How to connect:</h1>
          <ul className="list-disc pl-10 space-y-2">
            <li>Review our prices and become a member</li>
            <li>Complete your profile</li>
            <li>Select the date and time of your sit</li>
            <li>Choose a local link that meets your family’s needs</li>
          </ul>
        </div>

        <p>
          Our links have 48 hours to respond to each sit request and you will be
          emailed a confirmation once they accept!
        </p>

        <div>
          <h4>Membership Levels :</h4>
          <p>
            We require sits to be at least 2 hours. Your membership is month to
            month* with no contract.
          </p>
        </div>

        <p>
          *Your month is based on a 30 day billing cycle starting the day you
          join.
        </p>

        <p className="xl:col-span-2 max-w-3xl font-medium text-xl xl:hidden block">
          <span className="font-semibold"> Note: </span>Any counties outside of
          Fulton, Dekalb, Gwinnett, and Clayton require a $25 travel fee paid
          directly to the sitter for each sit.
        </p>
      </div>
    </div>
  );
};

export default MembershipPlan;
