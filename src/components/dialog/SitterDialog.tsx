"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSendMailInterestLinkMutation } from "@/redux/api/mailSendApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { TError } from "@/types";
import { Error_Modal } from "../modals/modals";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  emailAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  gender: z.string().min(1, {
    message: "Please enter your age.",
  }),
  neurodivergentExperience: z.enum(["yes", "no"], {
    message: "Please select an option.",
  }),
  experienceDescription: z.string().optional(),
  comfortableWithBehaviors: z.enum(["yes", "no"], {
    message: "Please select an option.",
  }),
  interestReason: z.string().min(10, {
    message: "Please provide a reason (at least 10 characters).",
  }),
});

export function SitterDialog() {
  const [open, setOpen] = useState(false);
  const [interestForm, { isLoading }] = useSendMailInterestLinkMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      emailAddress: "",
      gender: "",
      neurodivergentExperience: undefined,
      experienceDescription: "",
      comfortableWithBehaviors: undefined,
      interestReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedData = {
      parent: values?.fullName,
      phoneNumber: values?.phoneNumber,
      email: values?.emailAddress,
      gender: values?.gender,
      neurodivergentIndividuals: values?.neurodivergentExperience === "yes" ? "Yes" : "No",
      challengingBehaviors: values?.comfortableWithBehaviors === "yes" ? "Yes" : "No",
      reasonBecomingLink: values?.interestReason,
      brieflyDescribe: values?.experienceDescription,

    }

    try {
      await interestForm(formattedData).unwrap();
      toast.success("Form submitted successfully.");
      setOpen(false);
      form.reset()
    }
    catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary-blue md:text-xl md:py-6">
          Interest Form for Link
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] scroll-hide">
        <DialogHeader>
          <DialogTitle className="text-primary-blue">Hue-Man Links</DialogTitle>
          <DialogDescription>
            Please fill out the form below to express your interest in becoming
            a Link with Hue-Man Links.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="py-5 bg-primary-light-gray">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>

                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neurodivergentExperience"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Do you have experience working with neurodivergent
                    individuals?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("neurodivergentExperience") === "yes" && (
              <FormField
                control={form.control}
                name="experienceDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please briefly describe:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your experience"
                        className="resize-none bg-primary-light-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="comfortableWithBehaviors"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Are you comfortable supporting individuals with challenging
                    behaviors?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Why are you interested in becoming a Link with Hue-Man
                    Links?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your motivation"
                      className="min-h-[100px] resize-none bg-primary-light-gray"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} className="bg-primary-blue" type="submit">
                {isLoading && <Loader2 className="mr-2 animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
