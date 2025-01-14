const OtherInformation = () => {
  return (
    <div className="space-y-20">
      <div className="space-y-5">
        <h1 className="section-title text-primary-orange text-center">
          Overtime Link Hourly Rates
        </h1>
        <h4 className="section-subtitle text-primary-blue text-center">
          1.5x hourly rate
        </h4>
        <p className="text-2xl text-center max-w-7xl mx-auto">
          Sitter rates becomes 1.5x if the sit is extended more than 30 minutes
          once the sit has started.
        </p>
      </div>

      <div className="space-y-5">
        <h1 className="section-title text-primary-orange text-center">
          Holiday Link Hourly Rates
        </h1>
        <h4 className="section-subtitle text-primary-blue text-center">
          1.5x hourly rate
        </h4>
        <p className="md:text-2xl text-center max-w-7xl mx-auto">
          NYE, New Year’s Day, Valentine's after 5pm, Easter, Memorial Day, July
          4th, Labor Day, Thanksgiving, Black Friday, Christmas Eve & Christmas
          Day
        </p>
      </div>

      <div className="space-y-5">
        <h4 className="section-subtitle text-primary-blue text-center">
          Cancellation Fee Policy
        </h4>
        <p className="md:text-2xl text-center max-w-7xl mx-auto">
          If a cancellation is made within 1-24 hours of the scheduled sitting
          appointment, a $40 cancellation fee will apply. This fee helps
          compensate for the reserved time and any last-minute changes that may
          affect our sitters' schedules. We appreciate your understanding and
          cooperation.
        </p>
        <p className="md:text-2xl text-center max-w-7xl mx-auto">
          To avoid the cancellation fee, please cancel your appointment more
          than 24 hours in advance.
        </p>
      </div>
    </div>
  );
};

export default OtherInformation;
