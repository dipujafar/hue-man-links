import TopBanner from "@/components/shared/TopBanner";
import { Metadata } from "next";
import bannerImage from "@/assets/Images/banner2.png";
import Mission from "./_components/Mission";
import WhoWeAre from "./_components/WhoWeAre";
import MeetConnector from "./_components/MeetConnector";
import waterMarkImage from "@/assets/Images/waterMarkBg.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us page of Therapist",
};

const AboutUsPage = () => {
  return (
    <div className="relative">
      <TopBanner
        image={bannerImage}
        title="About Us"
        contentClass="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        titleClass="md:text-6xl text-xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>
      <Mission></Mission>
      <WhoWeAre></WhoWeAre>
      <MeetConnector></MeetConnector>
      <div className="absolute -bottom-40 right-0 !z-[-999]">
        <Image src={waterMarkImage} alt="watermark-Image"></Image>
      </div>
    </div>
  );
};

export default AboutUsPage;
