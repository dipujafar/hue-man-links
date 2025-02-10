"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookRequests from "./BookRequests";
import BookRequestPending from "./BookRequestPending";
import BookRequestCompleted from "./BookRequestCompleted";
import BookRequestRejected from "./BookRequestRejected";
import { useGetBabySitterJobsQuery } from "@/redux/api/babySitterJobs";
import { useEffect, useState } from "react";
import PostCardSkeleton from "@/components/shared/PostCardSkeleton";
import { Pagination } from "react-pagination-bar";

const BookRequestContainer = () => {
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

  const { data: SitterApplyJobs, isLoading: isSitterApplyJobsLoading } =
    useGetBabySitterJobsQuery(query || undefined);

  const meta = SitterApplyJobs?.meta;

  useEffect(() => {
    setCurrentPage(1);
  }, [status]);

  return (
    <div>
      <Tabs defaultValue="request" onValueChange={(value) => setStatus(value)}>
        <TabsList className="grid xl:w-[40%] lg:w-[60%] md:w-[85%] mx-auto grid-cols-4 bg-transparent gap-x-2 mb-3 overflow-x-auto">
          <TabsTrigger
            value="request"
            className="data-[state=active]:bg-primary-orange data-[state=active]:text-primary-white text-primary-black"
          >
            Approved
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
            Rejected
          </TabsTrigger>
        </TabsList>

        <hr />
        <hr />

        {isSitterApplyJobsLoading ? (
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
            <TabsContent value="request">
              <BookRequests data={SitterApplyJobs?.data}></BookRequests>
            </TabsContent>
            <TabsContent value="pending" className="lg:mt-16 mt-8">
              <BookRequestPending
                data={SitterApplyJobs?.data}
              ></BookRequestPending>
            </TabsContent>
            <TabsContent value="completed" className="lg:mt-16 mt-8">
              <BookRequestCompleted
                data={SitterApplyJobs?.data}
              ></BookRequestCompleted>
            </TabsContent>
            <TabsContent value="reject" className="lg:mt-16 mt-8">
              <BookRequestRejected
                data={SitterApplyJobs?.data}
              ></BookRequestRejected>
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

export default BookRequestContainer;
