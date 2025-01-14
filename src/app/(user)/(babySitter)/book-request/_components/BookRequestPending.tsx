import {
  childrenVariants,
  parentVariants,
} from "@/animation/framerMotionVariants";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import JobCard from "@/components/shared/JobCard";
import { TBabysittingRequest } from "@/types";
import Empty from "@/components/shared/Empty";

const BookRequestPending = ({ data }: { data: TBabysittingRequest[] }) => {
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
              href={`/post-details?postId=${
                jobData?.jobPost?.id
              }&status=${false}`}
            >
              <JobCard data={jobData?.jobPost}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-x-2 gap-y-2 ">
                  <div className="flex-1">
                    <Link href={"/message"}>
                      <Button className="w-full bg-primary-orange hover:bg-primary-gray group flex-1">
                        <MessageCircleMore
                          size={20}
                          className="mr-2 group-hover:animate-ping"
                        />
                        Message
                      </Button>
                    </Link>
                  </div>
                  {/* <div className="flex-1 w-full">
                    <Link href={"/family-user/0?status=completed"}>
                      <AnimatedButton className="w-full  bg-primary-orange text-primary-white border-none hover:bg-primary-orange/75  ">
                        Completed
                      </AnimatedButton>
                    </Link>
                  </div> */}
                </div>
              </JobCard>
            </Link>
            <hr />
          </motion.div>
        ))}
      </motion.div>
    </div>
  ) : (
    <Empty message="No Pending Jobs"></Empty>
  );
};

export default BookRequestPending;
