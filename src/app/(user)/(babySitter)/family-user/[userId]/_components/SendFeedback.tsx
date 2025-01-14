import AnimatedButton from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { InputRating } from "@/components/ui/inputrating";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const SendFeedback = () => {
  const [selectRating, setSelectRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };
  return (
    <div className="mt-5">
      {/* input rating */}
      <div className="space-y-4">
        <InputRating
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
          />

          {/* submit button */}
          <AnimatedButton className="mt-5 w-full bg-primary-orange hover:bg-primary-gray">
            Send Review
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default SendFeedback;
