import React from "react";
import TermsContainer from "./_components/TermsContainer";
import Container from "@/components/shared/Container";
import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";

const TermsPage = () => {
  return (
    <div className="relative">
      <TopBanner
        image={bannerImage}
        title="Terms & Conditions"
        contentClass="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        titleClass="md:text-6xl text-3xl sm:text-xl text-center font-bold text-primary-orange truncate"
      ></TopBanner>

      <Container className="page-padding">
        <TermsContainer></TermsContainer>
      </Container>
    </div>
  );
};

export default TermsPage;
