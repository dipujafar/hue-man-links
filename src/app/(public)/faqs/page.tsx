import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";
import { Metadata } from "next";
import Container from "@/components/shared/Container";
import Faqs from "./_Components/Faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "FAQs page of Therapist",
};

const FaqsPage = () => {
  return (
    <div>
      <TopBanner
        image={bannerImage}
        contentClass="absolute top-2/3 left-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>

      <Container>
        <Faqs></Faqs>
      </Container>
    </div>
  );
};

export default FaqsPage;
