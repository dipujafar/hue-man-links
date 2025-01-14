import InfoSection from "@/components/shared/InfoSection";
import sectionImage from "@/assets/Images/about-us-image/aboutImage.png";
import waterMark from "@/assets/Images/about-us-image/waterMarkImage.png";
import { Button } from "@/components/ui/button";

const Mission = () => {
  return (
    <div className="section">
      <InfoSection
        image={sectionImage}
        title="MISSION"
        subTitle="About us"
        contentClass="flex flex-col justify-center max-w-2xl"
        waterMarkImage={waterMark}
        descriptionClass="text-primary-black"
        waterMarkClass="-bottom-16 right-0"
      >
        <div>
          <p>
            At Hue-Man Links Incorporated, our mission is to connect families
            whose loved ones are neurodivergent with qualified, specialized
            sitters We understand the demands and challenges families face, and
            we're dedicated to providing trusted, compassionate care that offers
            peace of mind. Our goal is to ease the burden, giving families the
            confidence to take time for themselves, knowing their loved one is
            in capable and caring hands. We strive to be the link that supports
            families in finding the right care, so they can focus on balance and
            well-being. 
          </p>

          <div className="mt-10 flex flex-col md:flex-row justify-between gap-5">
            <Button className="bg-primary-orange py-6 px-8 w-full">
              Make a Connection <br />
              Families
            </Button>
            <Button className="bg-primary-blue py-6 px-8  w-full">
              Become a Link <br /> Sitters
            </Button>
          </div>
        </div>
      </InfoSection>
    </div>
  );
};

export default Mission;
