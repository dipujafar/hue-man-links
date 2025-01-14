import Container from "@/components/shared/Container";

const OurProcess = () => {
  return (
    <Container className="section">
      <h1 className="md:text-5xl text-3xl text-primary-blue text-center font-medium">
        Our Process
      </h1>

      <div className="md:mt-12 mt-6 max-w-5xl mx-auto md:space-y-10 space-y-5">
        <h6 className="md:text-3xl text-xl">
          Our links are the specialized sitters who are caring for your loved
          ones. Each links is:
        </h6>
        <ul className="md:space-y-6 space-y-4 md:text-2xl text-lg">
          <li>⦁ 18+ years old</li>
          <li>⦁ Have their own reliable transportation</li>
          <li>⦁ Have a clean background and driving record check</li>
          <li>
            ⦁ Are either RBT’s, Special Education Teachers, or Paraprofessionals{" "}
          </li>
          <li>⦁ Have experience working with neurodivergent clients</li>
          <li>⦁ Must pass a face-to-face interview with our team</li>
          <li>⦁ Must attend an orientation explaining our expectations</li>
        </ul>
      </div>
    </Container>
  );
};

export default OurProcess;
