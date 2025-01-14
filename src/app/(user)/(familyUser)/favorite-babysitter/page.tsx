import { Metadata } from "next";
import FavoriteBabySitters from "./_components/FavoriteBabySitters";

export const metadata: Metadata = {
  title: "Favorite BabySitter",
  description: "Favorite BabySitter Page",
};

const FavoriteBabySitterPage = () => {
  return (
    <div className="mt-5">
      <FavoriteBabySitters></FavoriteBabySitters>
    </div>
  );
};

export default FavoriteBabySitterPage;
