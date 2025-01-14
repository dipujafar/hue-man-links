"use client";
import MovementElement from "@/animation/MovementElement";
import { Input } from "@/components/ui/input";
import { allBabySitters } from "@/utils/allBabySitters";
import { Search } from "lucide-react";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import Link from "next/link";
import BabySitterCard from "@/components/shared/BabySitterCard";

const AllBabySittersContainer = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 6;

  return (
    <div className="lg:space-y-14 space-y-6">
      <MovementElement duration={0.1} y="-20%">
        <div className="relative hidden w-2/3 items-center lg:flex xl:w-1/2 mx-auto">
          <Input
            type="text"
            placeholder="search city/zipcode"
            className="w-full rounded-3xl pl-14 py-8 border-2 border-light-gray shadow-md"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Search
            className="absolute left-4 border-none font-light"
            size={24}
          />
        </div>
      </MovementElement>

      {/* all baby sitters cards */}

      <motion.div
        variants={parentVariants}
        whileInView="animate"
        initial="initial"
        exit="exit"
        className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 "
      >
        {allBabySitters
          ?.slice(
            (currentPage - 1) * pagePostsLimit,
            currentPage * pagePostsLimit
          )
          ?.map((babySitter, index) => (
            <motion.div
              variants={childrenVariants}
              key={index}
              className="lg:space-y-10 space-y-5"
            >
              <Link href={`/all-babysitters/${index}`}>
                <BabySitterCard data={babySitter}></BabySitterCard>
              </Link>
              <hr />
            </motion.div>
          ))}
      </motion.div>

      {/*pagination  */}
      <div className="mt-10 text-end  xl:w-[70%] mx-auto">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={allBabySitters?.length}
          pageNeighbours={2}
        />
      </div>
    </div>
  );
};

export default AllBabySittersContainer;
