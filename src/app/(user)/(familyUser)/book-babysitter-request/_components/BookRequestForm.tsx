"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import CountryStateCitySelector from "@/components/ui/CountryStateCitySelector";
import { DateTimeSelector } from "@/components/ui/TimeDate/selectTimeDate";
import { TagInput } from "@/components/ui/tagInput";
import { useCreateJobMutation } from "@/redux/api/jobsApi";
import { TError } from "@/types";
import { Error_Modal, Success_model } from "@/components/modals/modals";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import { useEffect, useState } from "react";
import { MinusCircle, Plus } from "lucide-react";
import MultipleSelect from "@/components/ui/multiple-select";
import { toast } from "sonner";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { Skeleton } from "@/components/ui/skeleton";

type TJobData = {
  ageOfChildren?: string;
  area?: string;
  city?: string;
  country?: string;
  dateTime?: {
    date?: Date;
    startTime?: string;
    endTime?: string;
  };
  description?: string;
  fullName?: string;
  house?: string;
  languages?: string[];
  numberOfChildren?: number;
  numberOfPets?: number;
  state?: string;
  tags?: string[];
  zipCode?: string;
};

type Client = {
  name: string;
  age: "";
  characteristics: string[];
};

const BookRequestForm = () => {
  const router = useRouter();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { data: userProfileData, isLoading: isProfileDataLoading } =
    useGetUserProfileQuery(undefined);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [clients, setClients] = useState<Client[]>([
    { name: "", age: "", characteristics: [] },
  ]);

  const addClient = () => {
    setClients([...clients, { name: "", age: "", characteristics: [] }]);
  };

  const removeClient = (index: number) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  const updateClient = (index: number, field: keyof Client, value: any) => {
    const updatedClients = [...clients];
    updatedClients[index][field] = value;
    setClients(updatedClients);
  };

  const onSubmit: SubmitHandler<TJobData> = async (data) => {
    if (data?.languages?.length === 0)
      return toast.error("Please select at least one language");
    const formattedJobData = {
      date: data?.dateTime?.date,
      startTime: data?.dateTime?.startTime,
      endTime: data?.dateTime?.endTime,
      fullName: data?.fullName,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      area: data?.area,
      houseNo: data?.house,
      zipCode: data?.zipCode,
      children: clients,
      description: data?.description,
      aboutFamily: data?.languages?.join(", "),
      numberOfPets: Number(data?.numberOfPets),
    };

    try {
      const res = await createJob(formattedJobData).unwrap();

      if (res?.data?.paymentLink) {
        router.push(res?.data?.paymentLink);
        return;
      }

      router.push(`/post-details?postId=${res?.data?.id}`);
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  useEffect(() => {
    setValue("fullName", userProfileData?.data?.familyUser?.personName);
    setValue("country", userProfileData?.data?.country);
    setValue("state", userProfileData?.data?.state);
    setValue("city", userProfileData?.data?.city);
    setValue("area", userProfileData?.data?.area);
    setValue("house", userProfileData?.data?.houseNo);
    setValue("zipCode", userProfileData?.data?.zipCode);
    setValue("numberOfPets", userProfileData?.data?.familyUser?.petCount);
  }, [userProfileData]);

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <div className="space-y-3  ">
            <Label className="text-xl font-semibold text-primary-blue ">
              Select Date
            </Label>
            <DateTimeSelector
              name="dateTime"
              control={control}
              errors={errors}
            />
          </div>
          {/* input name */}
          {/* Full Name */}
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Full Name
            </Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              className="w-full py-5 bg-primary-light-gray"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors?.fullName && (
              <p className="text-red-600 text-sm">
                {errors?.fullName?.message as string}
              </p>
            )}
          </div>
          {/* input address */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Address
            </Label>
            {isProfileDataLoading ? (
              <>
                <div className="flex gap-x-2 ">
                  <Skeleton className="h-[40px] flex-1"></Skeleton>
                  <Skeleton className="h-[40px] flex-1"></Skeleton>
                  <Skeleton className="h-[40px] flex-1"></Skeleton>
                </div>
                <div className="flex gap-x-2 ">
                  <Skeleton className="h-[40px] flex-1"></Skeleton>
                  <Skeleton className="h-[40px] flex-1"></Skeleton>
                  <Skeleton className="h-[40px] flex-1"></Skeleton>
                </div>
              </>
            ) : (
              <CountryStateCitySelector
                control={control}
                errors={errors}
                userAddress={{
                  country: userProfileData?.data?.country,
                  state: userProfileData?.data?.state,
                  city: userProfileData?.data?.city,
                  area: userProfileData?.data?.area,
                  house: userProfileData?.data?.houseNo,
                  zipCode: userProfileData?.data?.zipCode,
                }}
                register={register}
                setValue={setValue}
              />
            )}
          </div>

          {/* Children Information */}
          <div className="space-y-5 ">
            {/* Children Information Header */}
            <div className="flex justify-between flex-wrap gap-2">
              <h1 className="text-2xl font-semibold text-primary-blue">
                Children Information
              </h1>
              <Button
                type="button"
                className="bg-primary-orange group"
                onClick={addClient}
              >
                <Plus size={20} className="mr-1 group-hover:animate-bounce" />
                Add another children
              </Button>
            </div>

            {clients.map((client, index) => (
              <div key={index} className="relative space-y-5 ">
                {/* Cancel Icon (shows only if more than one client) */}
                {clients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClient(index)}
                    className="absolute top-2 right-2 text-primary-red hover:text-red-600"
                    aria-label="Remove client"
                  >
                    <MinusCircle size={20} color="red" />
                  </button>
                )}

                {/* Client Name and Birthday */}

                <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
                  {/* Input Children Name */}
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      {index > 0 && index + 1 + "."} Children Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Client’s name"
                      required
                      value={client.name}
                      onChange={(e) =>
                        updateClient(index, "name", e.target.value)
                      }
                      className="w-full py-5 bg-primary-light-gray"
                    />
                  </div>

                  {/* Age of Children */}
                  <div className="grid w-full items-center gap-1.5">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      Age of Children
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter age of children"
                      min={0}
                      required
                      value={client.age}
                      className="w-full py-5 bg-primary-light-gray"
                      onChange={(e) =>
                        updateClient(index, "age", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Characteristics of the children */}
                <div className="grid w-full  items-center gap-1.5">
                  <Label className="font-semibold text-lg text-primary-black/80">
                    Characteristics of the children
                  </Label>
                  <TagInput
                    value={client?.characteristics}
                    onChange={(e) => updateClient(index, "characteristics", e)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Description
            </Label>
            <Textarea
              rows={5}
              placeholder="Write your description here"
              className="w-full bg-primary-light-gray"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <p className="text-xl font-semibold text-primary-blue ">
            About your family
          </p>
          {/* input language */}

          <div className="grid w-full items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Languages
            </Label>

            <MultipleSelect
              name="languages"
              control={control}
              options={["Spanish", "English"]}
              placeholder="select languages"
            />
          </div>

          {/* input number of pets */}
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Number of Pets
            </Label>
            <Input
              type="number"
              placeholder="Enter number of pets"
              className="w-full py-5 bg-primary-light-gray"
              {...register("numberOfPets", {
                required: "Number of pets is required",
              })}
              min={0}
            />
            {errors.numberOfPets && (
              <p className="text-red-600 text-sm">
                {errors.numberOfPets.message as string}
              </p>
            )}
          </div>

          {/* ---- Submit Button ---- */}

          <div className="flex justify-center gap-x-5 flex-wrap gap-y-2">
            <Button
              type="reset"
              variant="outline"
              className="border-primary-orange text-primary-orange px-10 py-6 text-xl"
            >
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              type="submit"
              className="bg-primary-orange text-primary-white px-10 py-6 text-xl"
            >
              {isLoading && (
                <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
              )}
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookRequestForm;
