import TopBanner from "@/components/shared/TopBanner";
import bannerImage from "@/assets/Images/banner2.png";
import { Metadata } from "next";
import Container from "@/components/shared/Container";
import ConnectForm from "@/app/(public)/connect-us/_components/ConnectForm";
import ContactInfo from "@/app/(public)/connect-us/_components/ContactInfo";

export const metadata: Metadata = {
  title: "Connect Us",
  description: "Connect Us page of Therapist",
};

const ConnectUsPage = () => {
  return (
    <div>
      {/* how to connect with us details */}
      <Container>
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
