import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import Empty from "@/components/shared/Empty";
import JobApplyCard from "@/components/shared/JobApplyCard";
import { TJobApplication } from "@/types";
import { motion } from "framer-motion";

const BookSitterRejected = ({ data }: { data: TJobApplication[] }) => {
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
            <JobApplyCard data={jobApplyData}>
              <p className="text-lg text-primary-gray mt-2">
                {jobApplyData?.rejectReason && (
                  <>
                    <hr />
                    <span className="text-primary-black">
                      <span className="font-medium text-base"> Reason: </span>{" "}
                      {jobApplyData?.rejectReason}
                    </span>
                  </>
                )}
              </p>
            </JobApplyCard>

            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Rejected Jobs"></Empty>
  );
};

export default BookSitterRejected;
