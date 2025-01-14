import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import Empty from "@/components/shared/Empty";
import JobApplyCard from "@/components/shared/JobApplyCard";
import { TJobApplication } from "@/types";
import { motion } from "framer-motion";

const BookSitterCompleted = ({ data }: { data: TJobApplication[] }) => {
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
        {data?.map((jobApplyData, index: number) => (
          <motion.div
            variants={childrenVariants}
            key={index}
            className="lg:space-y-10 space-y-5"
          >
            <JobApplyCard data={jobApplyData}></JobApplyCard>

            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Completed Jobs"></Empty>
  );
};

export default BookSitterCompleted;
