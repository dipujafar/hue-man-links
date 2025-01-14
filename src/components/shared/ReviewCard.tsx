import { Card, CardContent } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { TReview } from "@/types";
import Image from "next/image";

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <Card className="border-none shadow-[0px 1px 10px 0px #0000001A] pt-5 px-6 max-w-4xl">
      <CardContent className="space-y-3">
        <div className="flex items-center gap-x-3">
          <Image
            src={review?.reviewer?.profilePicture}
            alt="reviewer image"
            width={900}
            height={700}
            className="size-14 rounded-full"
          ></Image>
          <div className="space-y-1">
            <h4 className="text-lg  font-medium">
              {review?.reviewer?.familyUser?.personName ||
                review?.reviewer?.babysitter?.firstName +
                  " " +
                  review?.reviewer?.babysitter?.lastName}
            </h4>

            <Rating rating={review?.rating} size={16}></Rating>
          </div>
        </div>
        <div>
          <p className="text-primary-gray">{review?.comment}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
