import InfoSection from "@/components/shared/InfoSection";
import sectionImage from "@/assets/Images/section-image2.png";
import circle from "@/assets/Images/circle.png";

const SpecializedSitters = () => {
  return (
    <div className="section">
      <InfoSection
        image={sectionImage}
        title="We connect families to specialized sitters"
        titleClass="text-center md:text-5xl text-xl"
        contentClass="flex flex-col justify-center max-w-2xl"
        className="lg:flex-row-reverse"
        btn="How It Works"
        waterMarkImage={circle}
        waterMarkClass="md:-bottom-12 md:-right-12 -bottom-4 -right-4"
        waterMarkImage2={circle}
        waterMarkClass2="md:-top-12 md:-left-12 -top-4 -left-4"
        btnLink="/specialized-links"
      />
    </div>
  );
};

export default SpecializedSitters;
