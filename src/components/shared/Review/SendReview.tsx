import { Error_Modal } from "@/components/modals/modals";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { InputRating } from "@/components/ui/inputrating";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSendReviewMutation } from "@/redux/api/reviewApi";
import { TError } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SendReview = ({ id }: { id: string }) => {
  const [selectRating, setSelectRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sendReview] = useSendReviewMutation();
  const router = useRouter();

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };

  const handleSendReview = async () => {
    if (!selectRating) {
      toast.error("Please select a rating.");
      return;
    }

    if (!comment) {
      toast.error("Please enter a comment.");
      return;
    }

    try {
      const res = await sendReview({
        reviewedId: id,
        rating: selectRating,
        comment: comment,
      }).unwrap();
      toast.success("Review sent successfully.");
      console.log(res);
      router.refresh();
    } catch (error: TError | any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }
  };
  return (
    <div className="mt-5">
      {/* input rating */}
      <div className="space-y-4">
        <InputRating
          rating={selectRating}
          onRatingChange={handleRatingChange}
          className="w-96"
        ></InputRating>

        <div>
          <Label className="text-2xl text-primary-gray">
            Please share your opinion about the babysitter
          </Label>
          <Textarea
            placeholder="Type your feedback here"
            className="mt-2 bg-primary-orange/10"
            rows={7}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* submit button */}
          <div onClick={handleSendReview}>
            {selectRating && comment ? (
              <AnimatedButton className="mt-5 w-full bg-primary-orange hover:bg-primary-gray">
                Send Review
              </AnimatedButton>
            ) : (
              <Button className="mt-5 w-full bg-primary-orange hover:bg-primary-gray">
                Send Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendReview;
