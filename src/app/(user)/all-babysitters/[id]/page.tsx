import SingleBabySitterContainer from "./_components/SingleBabySitterContainer";

export const metadata = {
  title: "BabySitter Details",
  description: "This is Single BabySitter Page",
};

const SingleBabySitterPage = ({ params }: { params: { id: string } }) => {
  return (
    <SingleBabySitterContainer id={params?.id}></SingleBabySitterContainer>
  );
};

export default SingleBabySitterPage;
