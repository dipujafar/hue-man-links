import InfoSection from "@/components/shared/InfoSection";
import sectionImage from "@/assets/Images/about-us-image/aboutImage2.png";
import waterMark from "@/assets/Images/about-us-image/waterMarkImage.png";

const WhoWeAre = () => {
  return (
    <div className="section">
      <InfoSection
        image={sectionImage}
        title="WHO WE ARE"
        titleClass=" text-center "
        contentClass="flex flex-col justify-center max-w-2xl"
        waterMarkImage={waterMark}
        waterMarkClass="-bottom-16 left-0"
        className="lg:flex-row-reverse"
        descriptionClass="text-primary-black"
      >
        <div>
          <p>
            We are a team of dedicated professionals with extensive experience
            working with neurodivergent clients. Our sitters are trained in
            understanding sensory sensitivities, communication differences, and
            behavioral challenges. We understand that every client is unique,
            and we are committed to creating an environment where they can
            thrive.
          </p>
        </div>
      </InfoSection>
    </div>
  );
};

export default WhoWeAre;
