import InfoSection from "@/components/shared/InfoSection";
import sectionImage from "@/assets/Images/section-image1.png";
import circle from "@/assets//Images/circle.png";

const SetUsApart = () => {
  return (
    <div className="section">
      <InfoSection
        image={sectionImage}
        title="What sets us apart"
        titleClass="text-center md:text-5xl text-xl"
        contentClass="flex flex-col justify-center max-w-2xl"
        waterMarkImage={circle}
        waterMarkClass="md:-bottom-12 md:-left-12 -bottom-4 -left-4"
        waterMarkImage2={circle}
        waterMarkClass2="md:-top-12 md:-right-12 -top-4 -right-4"
      >
        <p className="text-center lg:text-start text-sm md:text-lg ">
          Our links consists of RBT’s, Special Education Teachers, and
          Paraprofessionals, each bringing a wealth of expertise and experience
          to the table. Our focus is building strong meaningful connections
          between links and families, fosters trust and understanding, and
          creating a supportive network that addresses the needs of both the
          client and the family. 
        </p>
        <p className="mt-5 text-center lg:text-start text-sm md:text-lg">
          Additionally, our dedication to ongoing training and education keeps
          our staff at the cutting edge of best practices, ensuring that we
          provide the highest quality care possible.
        </p>
      </InfoSection>
    </div>
  );
};

export default SetUsApart;
