import bannerImage from "@/assets/Images/banner2.png";
import TopBanner from "@/components/shared/TopBanner";
import BabySitterForm from "./_component/BabySitterForm";
import Container from "@/components/shared/Container";

export const metadata = {
  title: "The Link Up",
  description: "The Link Up page of Hue-Man Links",
};

const LinkSitterPage = () => {
  return (
    <div>
      <TopBanner
        image={bannerImage}
        contentClass="absolute top-2/3 left-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>
      <Container className="section lg:space-y-16 space-y-5">
        <h1 className="section-header">THE LINK UP</h1>
        <BabySitterForm></BabySitterForm>
      </Container>
    </div>
  );
};

export default LinkSitterPage;
