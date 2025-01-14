"use client";
import MovementElement from "@/animation/MovementElement";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Pagination } from "react-pagination-bar";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import Link from "next/link";
import JobCard from "@/components/shared/JobCard";
import { useGetJobsQuery } from "@/redux/api/jobsApi";
import { TJobPost } from "@/types";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import Empty from "@/components/shared/Empty";

const AllJobPostsContainer = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 10;

  const query: Record<string, any> = {};
  query["page"] = currentPage;
  query["limit"] = pagePostsLimit;

  if (search) {
    query["searchTerm"] = search;
  }

  const { data: allJobPostData, isLoading: isJobDataLoading } = useGetJobsQuery(
    query || undefined
  );

  const meta = allJobPostData?.data?.meta;

  return (
    <div className="lg:space-y-14 space-y-6">
      {allJobPostData?.data?.data?.length ? (
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
      ) : (
        ""
      )}

      {/* all baby sitters cards */}

      {isJobDataLoading ? (
        <div className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10">
          {Array.from({ length: pagePostsLimit }).map((_, index) => (
            <PostCardSkeleton key={index}></PostCardSkeleton>
          ))}
        </div>
      ) : allJobPostData?.data?.data?.length ? (
        <motion.div
          variants={parentVariants}
          animate="animate"
          initial="initial"
          exit="exit"
          viewport={{ once: true }}
          className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 "
        >
          {allJobPostData?.data?.data?.map(
            (jobData: TJobPost, index: number) => (
              <motion.div
                variants={childrenVariants}
                key={index}
                className="lg:space-y-10 space-y-5"
              >
                <Link href={`/post-details?postId=${jobData?.id}`}>
                  <JobCard data={jobData}></JobCard>
                </Link>
                <hr />
              </motion.div>
            )
          )}
        </motion.div>
      ) : (
        <div className="min-h-[calc(100vh-350px)] flex items-center">
          <Empty message="No Job Posts "></Empty>
        </div>
      )}

      {/*pagination  */}
      <div className="mt-10 text-end  xl:w-[70%] mx-auto">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={pagePostsLimit}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          totalItems={meta?.total}
          pageNeighbours={2}
        />
      </div>
    </div>
  );
};

export default AllJobPostsContainer;
