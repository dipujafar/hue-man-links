import Container from "@/components/shared/Container";
import Image from "next/image";
import steps from "@/assets/Images/specialized-links/steps.png";

const HowToConnect = () => {
  return (
    <>
      <Container className="section">
        <h1 className="md:text-6xl text-3xl text-primary-blue text-center font-medium">
          How to connect with <br />
          specialized links
        </h1>
      </Container>
      <Image
        src={steps}
        alt="steps"
        className="md:mt-28 mt-10 w-full xl:w-[80%] mx-auto px-2 "
      ></Image>
    </>
  );
};

export default HowToConnect;
