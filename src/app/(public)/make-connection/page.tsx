import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";
import Container from "@/components/shared/Container";
import MakeConnectionForm from "./_components/MakeConnectionForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Connection",
  description: "Make Connection page of Therapist",
};

const MakeConnectionPage = () => {
  return (
    <div>
      <TopBanner
        image={bannerImage}
        contentClass="absolute top-2/3 left-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>
      <Container className="section lg:space-y-16">
        <h1 className="section-header">MAKE A CONNECTION</h1>
        <MakeConnectionForm></MakeConnectionForm>
      </Container>
    </div>
  );
};

export default MakeConnectionPage;
