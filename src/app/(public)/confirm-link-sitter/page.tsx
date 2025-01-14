import Container from "@/components/shared/Container";
import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";
import ConfirmBabySitterForm from "./_component/ConfirmBabySitterForm";

const ConfirmLinkSitterPage = () => {
  return (
    <div>
      <TopBanner
        image={bannerImage}
        contentClass="absolute top-2/3 left-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>
      <Container className="section md:space-y-20 space-y-7">
        <h1 className="section-header">THE LINK UP CONTINUES</h1>
        <ConfirmBabySitterForm />
      </Container>
    </div>
  );
};

export default ConfirmLinkSitterPage;
