"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Controller, useForm } from "react-hook-form";
import CountryStateCitySelector from "@/components/ui/CountryStateCitySelector";
import { useRouter } from "next/navigation";
import {
  useGetUserProfileQuery,
  useUpdateSitterProfileMutation,
} from "@/redux/api/userProfileApi";
import DashboardPageSkeleton from "@/components/shared/DashboardPageSkeleton";
import { Error_Modal } from "@/components/modals/modals";
import { TError } from "@/types";
import { toast } from "sonner";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import useFileUpload from "@/hooks/useFileUpload";

const BabySitterProfileContainer = () => {
  const [fileName, setFileName] = useState<File | null>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: userProfileData, isLoading: isProfileDataLoading } =
    useGetUserProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateSitterProfileMutation();
  const [upload] = useFileUpload();

  const user = userProfileData?.data;

  // input profile image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImageBlobUrl(url);
      setFileName(file);
    } else {
      setImageBlobUrl(null); // Clear the image URL if no file was selected
      setFileName(null);
    }

    // Reset the input value to allow selecting the same file again
    input.value = "";
  };

  const onSubmit = async (data: any) => {
    const formatted = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      mobileNumber: data.phoneNumber,
      country: data.country,
      state: data.state,
      city: data.city,
      area: data.area,
      zipCode: data.zipCode,
      houseNo: data.house,
    };

    try {
      if (fileName && imageBlobUrl) {
        // @ts-ignore
        const fileRes = await upload(fileName as File);
        await updateProfile({
          ...formatted,
          profilePicture: fileRes?.data?.url,
        }).unwrap();
        toast.success("Profile updated successfully.");
        setImageBlobUrl(null);
        setFileName(null);
        return;
      }

      const res = await updateProfile(formatted).unwrap();
      toast.success("Profile updated successfully.");
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  useEffect(() => {
    setValue("firstName", user?.babysitter?.firstName);
    setValue("lastName", user?.babysitter?.lastName);
    setValue("age", user?.babysitter?.age);
    setValue("gender", user?.babysitter?.gender);
    setValue("phoneNumber", user?.babysitter?.mobileNumber);
    setValue("country", user?.country);
    setValue("state", user?.state);
    setValue("city", user?.city);
    setValue("area", user?.area);
    setValue("zipCode", user?.zipCode);
    setValue("house", user?.houseNo);
  }, [userProfileData]);

  return isProfileDataLoading ? (
    <DashboardPageSkeleton></DashboardPageSkeleton>
  ) : (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <h1 className="text-xl font-semibold text-primary-blue ">
            Personal Information
          </h1>

          <div className="flex gap-x-10 gap-y-5 flex-col-reverse md:flex-row ">
            {/* basic information */}
            <div className="space-y-5 flex-1">
              {/* `---- input  email ---- */}
              <div className="grid w-full  items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  E-mail
                </Label>
                <Input
                  defaultValue={user?.email}
                  type="email"
                  id="email"
                  placeholder="example@ex.com"
                  className="w-full py-5 bg-primary-light-gray"
                  disabled
                />
              </div>

              {/* `---- input  First Name ---- */}
              <div className="grid w-full  items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  First Name
                </Label>
                <Input
                  defaultValue={user?.babysitter?.firstName}
                  type="text"
                  id="firstName"
                  placeholder="enter your first name"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors?.firstName?.message as string}
                  </p>
                )}
              </div>

              {/* `---- input Last Name ---- */}
              <div className="grid w-full  items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  Last Name
                </Label>
                <Input
                  defaultValue={user?.babysitter?.lastName}
                  type="text"
                  id="lastName"
                  placeholder="enter your last name"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors?.lastName && (
                  <p className="text-sm text-red-500">
                    {errors?.lastName?.message as string}
                  </p>
                )}
              </div>

              {/* `---- input gender ---- */}
              <div className="grid w-full  items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  Gender
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={user?.babysitter?.gender}
                    >
                      <SelectTrigger className="w-full py-5 bg-primary-light-gray">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* `---- input Age ---- */}
              <div className="grid w-full  items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  Age
                </Label>
                <Input
                  defaultValue={user?.babysitter?.age}
                  type="number"
                  id="age"
                  placeholder="enter your age"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("age", {
                    required: "Age is required",
                  })}
                />
              </div>
            </div>

            {/* ---- upload image ---- */}
            <div className="pt-6  flex items-center  flex-col">
              <div className="relative ">
                <Image
                  src={imageBlobUrl || user?.profilePicture}
                  alt="profile"
                  width={900}
                  height={700}
                  className="size-40 rounded-full border-2 border-primary-orange"
                ></Image>
                <div className="absolute bottom-0 right-2 z-[9999] flex flex-col items-center gap-4 w-fit">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-fit h-fit flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 border-none shadow-none bg-transparent p-0 "
                  >
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <ImageIcon
                        color="#F26D6D"
                        size={32}
                        className=" border-none"
                      />
                    </label>
                  </Button>
                </div>
                {fileName && imageBlobUrl && (
                  <div
                    className=" cursor-pointer absolute top-2 left-4 bg-primary-blue/70 rounded-md"
                    onClick={() => {
                      setFileName(null);
                      setImageBlobUrl(null);
                    }}
                  >
                    <X color="red" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* user phone number */}
          <div className="mb-2 space-y-1">
            <Label className="font-semibold text-lg text-primary-black/80">
              Mobile Number
            </Label>
            <Controller
              // @ts-ignore
              name="phoneNumber"
              // rules={{ required: "Phone number is required" }}
              control={control}
              render={({ field }) => (
                <PhoneInput
                  // @ts-ignore
                  value={user?.babysitter?.mobileNumber || field.value}
                  onChange={field.onChange}
                  international
                  defaultCountry="US"
                />
              )}
            />
          </div>

          {/* ---- Home Address ---- */}
          <div className="space-y-5">
            <h3 className="text-2xl font-semibold text-primary-blue">
              Home Address
            </h3>

            {/* ---- input   Address ---- */}
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Address
              </Label>
              {/*---- input   country ---- */}
              <CountryStateCitySelector
                control={control}
                errors={errors}
                userAddress={{
                  country: user?.country || "United States",
                  state: user?.state || "Georgia",
                  city: user?.city,
                  area: user?.area,
                  house: user?.houseNo || "12",
                  zipCode: user?.zipCode,
                }}
                register={register}
                setValue={setValue}
              />
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex  justify-center items-center gap-x-5 mt-10">
          <Button
            type="submit"
            className="bg-primary-orange text-primary-white px-10 py-5 text-xl"
            disabled={isUpdateProfileLoading}
          >
            {isUpdateProfileLoading && (
              <LoadingSpain className="mr-2" color="#fff"></LoadingSpain>
            )}
            Save Change
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BabySitterProfileContainer;
