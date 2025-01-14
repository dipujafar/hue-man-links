import InfoSection from "@/components/shared/InfoSection";
import sectionImage from "@/assets/Images/about-us-image/aboutimage3.png";
import waterMark from "@/assets/Images/about-us-image/waterMarkImage.png";

const MeetConnector = () => {
  return (
    <div className="section">
      <InfoSection
        image={sectionImage}
        title="MEET THE CONNECTOR"
        titleClass=" text-center "
        contentClass="flex flex-col justify-center max-w-2xl"
        waterMarkImage={waterMark}
        waterMarkClass="-bottom-16 left-0"
        descriptionClass="text-primary-black"
      >
        <div className="space-y-5">
          <p>
            Rashida Biera, Board Certified Behavior Analyst, Owner and Founder
            of Hue-Man Links Incorporated created this sitting agency out of a
            deep passion for supporting families of neurodivergent loved ones.
            After witnessing firsthand how difficult it is for families to find
            reliable, compassionate care for their loved ones, she knew there
            had to be a better way to connect families with caregivers who truly
            understand their unique challenges.
          </p>
          <p>
            Driven by a desire to link families with trusted, specialized
            sitters, the owner wanted to create more than just a sitting
            service, she wanted to build a network that fosters real
            connections. The goal is to bridge the gap between sitters and
            families, ensuring that each client is given the care and attention
            they deserve, while families can find peace of mind and balance in
            their lives. Hue-Man Links Incorporated was born from this vision,
            dedicated to creating meaningful relationships that empower both
            families and sitters alike.
          </p>
        </div>
      </InfoSection>
    </div>
  );
};

export default MeetConnector;
