"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookSitterRejected from "./BookSitterRejected";
import BookSitterPending from "./BookSitterPending";
import BookSitterCompleted from "./BookSitterCompleted";
import BookSitterRequest from "./BookSitterRequest";
import { useGetUserJobsQuery } from "@/redux/api/userJobsApi";
import { use, useEffect, useState } from "react";
import { Pagination } from "react-pagination-bar";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";

const BookSitterContainer = () => {
  const [status, setStatus] = useState("request");
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 10;

  const query: Record<string, string | number> = {};
  query["page"] = currentPage;
  query["limit"] = pagePostsLimit;

  if (status === "request") {
    query["status"] = "PENDING";
  }
  if (status === "pending") {
    query["status"] = "APPROVED";
  }
  if (status === "completed") {
    query["status"] = "COMPLETED";
  }
  if (status === "reject") {
    query["status"] = "CANCELLED";
  }

  const { data: userJobs, isLoading: isUserJobsLoading } = useGetUserJobsQuery(
    query || undefined
  );

  const meta = userJobs?.meta;

  useEffect(() => {
    setCurrentPage(1);
  }, [status]);

  return (
    <div>
      {/* navigation tabs */}
      <Tabs defaultValue="request" onValueChange={(value) => setStatus(value)}>
        <TabsList className="grid xl:w-[40%] lg:w-[60%] md:w-[85%] mx-auto grid-cols-4 bg-transparent gap-x-2 mb-3">
          <TabsTrigger
            value="request"
            className="data-[state=active]:bg-primary-orange data-[state=active]:text-primary-white text-primary-black"
          >
            Request
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-primary-orange data-[state=active]:text-primary-white text-primary-black"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-primary-orange data-[state=active]:text-primary-white text-primary-black"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="reject"
            className="data-[state=active]:bg-primary-orange data-[state=active]:text-primary-white text-primary-black"
          >
            Reject
          </TabsTrigger>
        </TabsList>

        <hr />
        <hr />

        {/* tabs content */}

        {isUserJobsLoading ? (
          Array.from({ length: pagePostsLimit }).map((_, index) => (
            <div
              key={index}
              className="mt-5 grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10"
            >
              <PostCardSkeleton></PostCardSkeleton>
            </div>
          ))
        ) : (
          <>
            <TabsContent value="request" className="lg:mt-16 mt-8">
              <BookSitterRequest data={userJobs?.data}></BookSitterRequest>
            </TabsContent>
            <TabsContent value="pending" className="lg:mt-16 mt-8">
              <BookSitterPending data={userJobs?.data}></BookSitterPending>
            </TabsContent>
            <TabsContent value="completed" className="lg:mt-16 mt-8">
              <BookSitterCompleted data={userJobs?.data}></BookSitterCompleted>
            </TabsContent>
            <TabsContent value="reject" className="lg:mt-16 mt-8">
              <BookSitterRejected data={userJobs?.data}></BookSitterRejected>
            </TabsContent>
          </>
        )}
      </Tabs>

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

export default BookSitterContainer;
