import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";
import { Metadata } from "next";
import ConnectForm from "./_components/ConnectForm";
import Container from "@/components/shared/Container";
import ContactInfo from "./_components/ContactInfo";

export const metadata: Metadata = {
  title: "Connect Us",
  description: "Connect Us page of Therapist",
};

const ConnectUsPage = () => {
  return (
    <div>
      <TopBanner
        image={bannerImage}
        contentClass="absolute top-2/3 left-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>

      {/* how to connect with us details */}
      <Container className="section">
        <h1 className="md:text-7xl text-3xl text-primary-blue font-medium text-center">
          Connect with Us
        </h1>

        <div className="md:mt-20 mt-10 flex justify-center gap-x-60 gap-y-10 flex-col md:flex-row">
          <ConnectForm></ConnectForm>
          <ContactInfo></ContactInfo>
        </div>
      </Container>
    </div>
  );
};

export default ConnectUsPage;
