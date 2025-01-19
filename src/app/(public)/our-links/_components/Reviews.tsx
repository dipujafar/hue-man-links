"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Rating } from "@/components/ui/rating";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import Empty from "@/components/shared/Empty";
import { Skeleton } from "@/components/ui/skeleton";

const Reviews = () => {
  const { data: reviews, isLoading } = useGetAllReviewsQuery(undefined);
  return isLoading ? (
    <Skeleton className="h-[300px] w-full mt-10"></Skeleton>
  ) : (
    <div className="section mt-20">
      <div></div>
      <h2 className="text-center text-lg md:text-2xl  text-primary-blue md:mb-4 font-semibold">
        Reviews
      </h2>
      <h2 className="text-center text-base md:text-4xl   text-primary-black mb-10 font-semibold">
        What families are saying about our <br /> services!
      </h2>

      {reviews?.data?.data?.length ? (
        <div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 3000,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full relative"
          >
            <CarouselContent>
              {reviews?.data?.data?.map((data: any, index: number) => (
                <CarouselItem
                  key={index}
                  className=" lg:basis-1/2 2xl:basis-1/3"
                >
                  <div className="flex flex-col md:flex-row items-center ">
                    <Image
                      src={data?.reviewer?.profilePicture}
                      alt={`user_image`}
                      width={1000}
                      height={700}
                      className="size-20 rounded-full relative md:-top-10 md:left-10 top-10"
                    ></Image>
                    <Card className="pt-4 w-full py-5">
                      <CardContent className="space-y-2 py-6 md:pl-16">
                        <div className="space-y-1">
                          <h4 className="text-xl font-bold">
                            {data?.reviewer?.familyUser?.personName ||
                              data?.reviewer?.babysitter?.firstName +
                                " " +
                                data?.reviewer?.babysitter?.lastName}
                          </h4>
                          {/* <p className="text-primary-gray font-bold">
                    {data?.designation}
                  </p> */}
                        </div>
                        <Rating rating={data?.rating} color="text-[#F3CD03]" />
                        <p className=" text-primary-gray">{data?.comment} </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="top-1/1 translate-y-0 left-1/2 -translate-x-1/2 mt-10  -ml-8 size-12 border-2 border-primary-blue" />
    <CarouselNext className="top-1/1 translate-y-0 left-1/2 -translate-x-1/2 mt-10 ml-8 size-12 bg-primary-orange" /> */}
          </Carousel>
        </div>
      ) : (
        <Empty message="No Reviews Found!"></Empty>
      )}
    </div>
  );
};

export default Reviews;
