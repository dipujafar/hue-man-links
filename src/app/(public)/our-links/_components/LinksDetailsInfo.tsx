import InfoSection from "@/components/shared/InfoSection";
import sectionImage from "@/assets/Images/our-links-images/link-page-image.png";

const LinksDetailsInfo = () => {
  return (
    <div className="section">
      <h2 className="text-center text-2xl md:text-5xl font-medium text-primary-blue mb-14">
        You are the missing link!
      </h2>

      <InfoSection
        image={sectionImage}
        contentClass="flex flex-col justify-center max-w-2xl"
        descriptionClass="text-primary-black"
      >
        <div className="space-y-5">
          {/* reinforcers */}
          <div className="flex flex-col justify-center gap-y-2">
            <h1 className="text-center text-2xl font-semibold">Reinforcers</h1>
            <ul>
              <li>- Retain 100% of your earnings</li>
              <li>- Set your own schedule</li>
              <li>- BCBA candidates can accrue unrestricted hours</li>
            </ul>
          </div>

          {/* qualifications */}
          <div className="flex flex-col justify-center gap-y-2">
            <h1 className="text-center text-2xl font-semibold">
              Qualifications
            </h1>
            <ul>
              <li>- Must be 18 years or older</li>
              <li>
                {" "}
                - Hold a valid driver’s license and have reliable transportation
              </li>
              <li>
                - Required to be an RBT, Special Education Teacher, or
                Paraprofessional
              </li>
              <li>
                {" "}
                - Must have experience working with neurodivergent clients
              </li>
              <li> - Clean background check and driving record</li>
              <li>- CPR certification is mandatory</li>
            </ul>
          </div>

          {/*  Expectations for our Links */}
          <div className="flex flex-col justify-center gap-y-2">
            <h1 className="text-center text-2xl font-semibold">
              Expectations for our Links
            </h1>
            <ul>
              <li>- Keep your availability updated at all times</li>
              <li>- Respond to sit requests within 24 hours</li>
              <li>
                - Send a greeting text to families 1-2 days before your
                scheduled sit
              </li>
              <li>
                {" "}
                - Arrive early or on time, fully engaged and present during your
                connection (no cell phones).
              </li>
            </ul>
          </div>
        </div>
      </InfoSection>
    </div>
  );
};

export default LinksDetailsInfo;
