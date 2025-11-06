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
import CountryStateCitySelector from "../ui/CountryStateCitySelector";
import { useSendMailClientIntakeFormMutation } from "@/redux/api/mailSendApi";
import { toast } from "sonner";
import { Error_Modal } from "../modals/modals";
import { TError } from "@/types";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  parentGuardianName: z.string().min(2, {
    message: "Parent/Guardian name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  emailAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  childName: z.string().min(2, {
    message: "Child's name must be at least 2 characters.",
  }),
  childAge: z.string().min(1, {
    message: "Please enter the child's age.",
  }),
  diagnosis: z.string().optional(),
  receivingABAServices: z.enum(["yes", "no"], {
    message: "Please select an option.",
  }),
  challengingBehaviors: z.enum(["yes", "no"], {
    message: "Please select an option.",
  }),
  behaviorDescription: z.string().optional(),
});

export function ClientIntakeDialog() {
  const [open, setOpen] = useState(false);
  const [clientInTakeForm, { isLoading }] = useSendMailClientIntakeFormMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentGuardianName: "",
      phoneNumber: "",
      emailAddress: "",
      city: "",
      childName: "",
      childAge: "",
      diagnosis: "",
      receivingABAServices: undefined,
      challengingBehaviors: undefined,
      behaviorDescription: "",
    },
  });

  const { setValue, register, control } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedData = {
      parent: values?.parentGuardianName,
      phoneNumber: values?.phoneNumber,
      email: values?.emailAddress,
      city: values?.city,
      childName: values?.childName,
      childAge: values?.childAge,
      diagnosis: values?.diagnosis,
      receivingABAService: values?.receivingABAServices ? "Yes" : "No",
      anyChallengingBehaviors: values?.challengingBehaviors ? "Yes" : "No",
      brieflyDescribe: values?.behaviorDescription,
    }

    try {
      await clientInTakeForm(formattedData).unwrap();
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
        <Button className="bg-primary-orange md:text-xl md:py-6">
          Client Intake Form
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px] scroll-hide">
        <DialogHeader>
          <DialogTitle className="text-primary-orange">
            Hue-Man Links
          </DialogTitle>
          <DialogDescription>
            Please fill out the form below to help us understand your needs.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="parentGuardianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent/Guardian Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      placeholder="Enter your name"
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
            <div>
              <label className="block text-sm font-medium  mb-0.5">City</label>
              <CountryStateCitySelector
                onlyCity={true}
                control={control}
                setValue={setValue}
                register={register}
                userAddress={{
                  country: "United States",
                  state: "Georgia",
                  city: "",
                  area: "",
                  house: "12",
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child&apos;s Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      placeholder="Enter child's name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="childAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Child&apos;s Age</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      placeholder="Enter child's age"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 bg-primary-light-gray"
                      placeholder="Enter diagnosis (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="receivingABAServices"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Is your child currently receiving ABA services?
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
              name="challengingBehaviors"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Does your child display any challenging behaviors?
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

            {form.watch("challengingBehaviors") === "yes" && (
              <FormField
                control={form.control}
                name="behaviorDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Briefly describe:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the challenging behaviors"
                        className="resize-none bg-primary-light-gray"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="text-muted-foreground">
                Thank you so much for reaching out! We&apos;ll be in touch
                within 48 hours to connect, learn more about your needs, and see
                if we&apos;re a good fit for your family.
              </p>
            </div> */}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} className="bg-primary-orange" type="submit">
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
