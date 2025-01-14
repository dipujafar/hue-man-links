import MyPostsContainer from "./_components/MyPostsContainer";

export const metadata = {
  title: "My Posts",
  description: "This is My Posts Page",
};

const MyPostsPage = () => {
  return (
    <div>
      <MyPostsContainer></MyPostsContainer>
    </div>
  );
};

export default MyPostsPage;
