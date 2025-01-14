"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Rating } from "@/components/ui/rating";
import { topLinksData } from "@/utils/topLinks";
import { Dot } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useGetTopLinkQuery } from "@/redux/api/topLinkApi";
import { TBabysitterUser } from "@/types";
import Link from "next/link";
import Empty from "@/components/shared/Empty";
import { Skeleton } from "@/components/ui/skeleton";

const TopLinks = () => {
  const { data: topLinks, isLoading } = useGetTopLinkQuery(undefined);

  return isLoading ? (
    <Skeleton className="h-[300px] mt-32"></Skeleton>
  ) : (
    <div className="section">
      <h2 className="text-center text-2xl md:text-5xl font-medium text-primary-blue mb-14">
        Top Links
      </h2>

      {topLinks?.data?.length ? (
        <div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
              duration: 2500,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
            className="w-full relative"
          >
            <CarouselContent>
              {topLinks?.data?.map((data: TBabysitterUser, index: number) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4 p-2"
                >
                  <Link href={`/all-babysitters/${data?.babysitter?.userId}`}>
                    <Card className="pt-4 border-none shadow min-h-[220px]">
                      <CardContent className="space-y-2 px-0">
                        <div className="flex items-center md:gap-x-6 gap-x-2">
                          <div className="border border-primary-orange pl-4 p-1 rounded-br-[50px] rounded-tr-xl relative shadow-xl">
                            <Dot className=" absolute -right-3 -top-3 size-10 text-primary-orange"></Dot>
                            <Image
                              src={data?.profilePicture}
                              alt={`${data?.babysitter?.firstName} image`}
                              width={1000}
                              height={700}
                              className="size-24 rounded-full"
                            ></Image>
                          </div>
                          <div>
                            <h5 className="text-2xl text-primary-green">
                              {data?.babysitter?.firstName}{" "}
                              {data?.babysitter?.lastName}
                            </h5>
                            <p>
                              {data?.babysitter?.experience} Years of Experience
                            </p>
                            <p className="flex gap-x-2">
                              <Rating
                                rating={data?.babysitter?.avgRating}
                                className="w-24"
                              ></Rating>{" "}
                              {data?.babysitter?.avgRating} (
                              {data?.babysitter?.reviewCount})
                            </p>
                          </div>
                        </div>
                        <div className="lg:px-4 px-1 text-center">
                          {data?.babysitter?.bio?.length > 149
                            ? `${data?.babysitter?.bio?.slice(0, 150)}...`
                            : data?.babysitter?.bio}{" "}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious className="top-1/1 translate-y-0 left-1/2 -translate-x-1/2 mt-8  -ml-8 size-12 border-2 border-primary-blue" />
          <CarouselNext className="top-1/1 translate-y-0 left-1/2 -translate-x-1/2 mt-8 ml-8 size-12 bg-primary-orange" /> */}
          </Carousel>
        </div>
      ) : (
        <Empty message="No  links exist at the moment"></Empty>
      )}
    </div>
  );
};

export default TopLinks;
