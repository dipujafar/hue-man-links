import banner1 from "@/assets/Images/banner1.png";
import TopBanner from "@/components/shared/TopBanner";
const Hero = () => {
  return (
    <div>
      <TopBanner
        image={banner1}
        title={`Specialized Sitters, Stronger Links:`}
        BannerTitle="Connecting Care with Compassion"
        titleClass="xl:text-6xl lg:text-5xl md:text-4xl	 text-sm   text-primary-white font-semibold text-nowrap  text "
        contentClass="absolute lg:top-1/2 lg:-translate-y-10 translate-y-6 top-1/3"
        imageClass="max-h-[100vh] "
        btn="How to Connect with Specialized Links"
        btnClass=" bg-primary-orange font-medium md:py-8 py-6  md:text-lg hover:bg-gray-700 "
        btnLink="/specialized-links"
      />
    </div>
  );
};

export default Hero;
