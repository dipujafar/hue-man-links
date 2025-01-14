import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";
import HowToConnect from "./_componetns/HowToConnect";
import OurProcess from "./_componetns/OurProcess";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import waterMarkImage from "@/assets/Images/waterMarkBg.png";
import TopLinks from "./_componetns/TopLinks";

const SpecializedLinksPage = () => {
  return (
    <div className="relative">
      <TopBanner
        image={bannerImage}
        title="Specialized Links"
        contentClass="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>
      <HowToConnect></HowToConnect>
      <OurProcess></OurProcess>
      <TopLinks></TopLinks>
      <Link
        href={"/make-connection"}
        className="flex justify-center xl:mt-32 mt-10"
      >
        <Button className="bg-primary-orange md:py-6 px-8">
          Make A Connection
        </Button>
      </Link>

      <div className="absolute bottom-0 right-0 !z-[-999]">
        <Image src={waterMarkImage} alt="watermark-Image"></Image>
      </div>
    </div>
  );
};

export default SpecializedLinksPage;
