"use client";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import { Error_Modal } from "@/components/modals/modals";
import SitterIgnoreModal from "@/components/shared/SitterIgnoreModal";
import { Rating } from "@/components/ui/rating";
import {
  useGetFavoriteSitterQuery,
  usePostFavoriteSitterMutation,
  useRemoveFavoriteSitterMutation,
} from "@/redux/api/favoriteSitterApi";
import { useAppSelector } from "@/redux/hooks";
import { TBabysitterUser, TError } from "@/types";
import { Heart, RefreshCwOff } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SitterBanner = ({ data }: { data: TBabysitterUser }) => {
  const user: any = useAppSelector((state) => state.auth.user);
  const [isAlreadyInFavorite, setIsAlreadyInFavorite] = useState(false);
  const status = useSearchParams().get("status");
  const [ignore, setIgnore] = useState(false);
  const [postFavoriteSitter, { isLoading: isPostFavoriteSitterLoading }] =
    usePostFavoriteSitterMutation();
  const { data: favoriteSitterData, isLoading: isFavoriteSitterDataLoading } =
    useGetFavoriteSitterQuery(undefined);
  const [removeFavoriteSitter, { isLoading: isRemoveFavoriteSitterLoading }] =
    useRemoveFavoriteSitterMutation();

  useEffect(() => {
    if (favoriteSitterData) {
      const isAlreadyInFavorite = favoriteSitterData?.data?.some(
        (item: any) => item?.babysitter?.id === data?.babysitter?.id
      );
      setIsAlreadyInFavorite(isAlreadyInFavorite);
    }
  });

  const handleFavoriteSitter = async () => {
    if (isAlreadyInFavorite) {
      try {
        await removeFavoriteSitter(data?.babysitter?.id).unwrap();
        toast.success("Sitter removed from your favorite list.");
      } catch (error: TError | any) {
        Error_Modal({ title: error?.data?.message });
      }
      return;
    } else {
      try {
        await postFavoriteSitter({
          babysitterId: data?.babysitter?.id,
        }).unwrap();
        toast.success("Sitter added to your favorite list.");
      } catch (error: TError | any) {
        Error_Modal({ title: error?.data?.message });
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center lg:gap-x-14 gap-x-10 gap-y-5 py-8 bg-gradient-to-r from-[#038C7F] to-[#558399] px-5 relative rounded-md">
      {/* profile Image */}
      <Image
        src={data?.profilePicture}
        alt="Sitter Profile Image"
        width={1900}
        height={1600}
        className="size-60 rounded-full border border-primary-blue"
      ></Image>

      {/* profile details */}
      <div className="text-primary-white flex flex-col items-center gap-y-4">
        <h1 className="lg:text-5xl text-3xl font-medium">
          {data?.babysitter?.firstName} {data?.babysitter?.lastName}
        </h1>
        <p className="lg:text-lg text-center">
          Babysitting job in {data?.city}, {data?.state}
        </p>
        <div className="flex gap-x-2 items-center">
          <Rating rating={data?.babysitter?.avgRating}></Rating>
          <span className="lg:text-lg font-bold">
            {data?.babysitter?.avgRating}
          </span>
          <span className="lg:text-lg font-bold">
            ({data?.babysitter?.reviewCount})
          </span>
        </div>
      </div>

      {/* Favorite Button */}

      {user?.role === "FAMILY_USER" && status === "completed" && (
        <div className="absolute top-4 right-4">
          <div className="flex justify-center items-center gap-x-2">
            <div
              onClick={handleFavoriteSitter}
              className=" bg-foundation-white p-2 rounded-full cursor-pointer"
            >
              {isPostFavoriteSitterLoading || isRemoveFavoriteSitterLoading ? (
                <LoadingSpain color="#e87374"></LoadingSpain>
              ) : isAlreadyInFavorite ? (
                <Heart fill="#fe0032" color="#fe0032" />
              ) : (
                <Heart />
              )}
            </div>

            <div
              className="bg-foundation-white p-2 rounded-full cursor-pointer"
              onClick={() => setIgnore(true)}
            >
              <RefreshCwOff color="#fe0032" />
            </div>
          </div>
        </div>
      )}

      <SitterIgnoreModal
        open={ignore}
        setOpen={setIgnore}
        sitterId={data?.babysitter?.id}
      ></SitterIgnoreModal>
    </div>
  );
};

export default SitterBanner;
