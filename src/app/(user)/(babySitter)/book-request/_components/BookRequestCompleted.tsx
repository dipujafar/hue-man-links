import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import Empty from "@/components/shared/Empty";
import JobCard from "@/components/shared/JobCard";
import { TBabysittingRequest } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

const BookRequestCompleted = ({ data }: { data: TBabysittingRequest[] }) => {
  return data?.length ? (
    <div>
      <motion.div
        variants={parentVariants}
        animate="animate"
        initial="initial"
        exit="exit"
        viewport={{ once: true }}
        className="grid grid-cols-1  xl:w-[70%] mx-auto gap-y-10 "
      >
        {data?.map((jobData, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5"
          >
            <Link
              href={`/post-details?postId=${jobData?.jobPost?.id}&status=false`}
            >
              <JobCard data={jobData?.jobPost}></JobCard>
            </Link>
            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Completed Jobs"></Empty>
  );
};

export default BookRequestCompleted;
