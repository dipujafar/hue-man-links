"use client";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import { ConfirmModal, Error_Modal } from "@/components/modals/modals";
import BabySitterCard from "@/components/shared/BabySitterCard";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import {
  useGetFavoriteSitterQuery,
  useRemoveFavoriteSitterMutation,
} from "@/redux/api/favoriteSitterApi";
import { TError } from "@/types";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const FavoriteBabySitters = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const pagePostsLimit = 6;
  const { data: allFavoriteSitters, isLoading: isFavoriteSitterLoading } =
    useGetFavoriteSitterQuery(undefined);

  const [removeFavoriteSitter] = useRemoveFavoriteSitterMutation();

  const handleFavoriteSitter = async (id: string) => {
    ConfirmModal(
      "Are you sure?",
      "You want to remove this sitter from your favorite list?",
      "Confirm",
      "Cancel"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          toast.loading("Removing...", { id: "remove" });
          await removeFavoriteSitter(id).unwrap();
          toast.success("Sitter removed from your favorite list.", {
            id: "remove",
          });
        } catch (error: TError | any) {
          Error_Modal({ title: error?.data?.message });
        }
      }
    });
  };
  return isFavoriteSitterLoading ? (
    <div className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 ">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCardSkeleton></PostCardSkeleton>
      ))}
    </div>
  ) : (
    <div>
      <motion.div
        variants={parentVariants}
        animate="animate"
        initial="initial"
        exit="exit"
        viewport={{ once: true }}
        className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 "
      >
        {allFavoriteSitters?.data?.map((babySitter: any, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5"
          >
            <div className="relative">
              <Link href={`/all-babysitters/${babySitter?.babysitter?.userId}`}>
                <BabySitterCard data={babySitter}></BabySitterCard>
              </Link>

              {/* Favorite Button */}
              <div
                className="absolute top-4 right-4 bg-foundation-white p-2 rounded-full cursor-pointer"
                onClick={() => handleFavoriteSitter(babySitter?.babysitter?.id)}
              >
                <Heart fill="#F26D6D" className="text-[#F26D6D]" />
              </div>
            </div>
            {index !== allFavoriteSitters?.data?.length - 1 && (
              <div>
                <hr />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/*pagination  */}
      {/* <div className="mt-10 text-end  xl:w-[70%] mx-auto">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={allBabySitters?.length}
          pageNeighbours={2}
        />
      </div> */}
    </div>
  );
};

export default FavoriteBabySitters;
