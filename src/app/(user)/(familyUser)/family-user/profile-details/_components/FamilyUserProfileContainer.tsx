"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageIcon, MinusCircle, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import CountryStateCitySelector from "@/components/ui/CountryStateCitySelector";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { DatePicker } from "@/components/ui/date-picker";
import {
  useGetUserProfileQuery,
  useUpdateFamilyProfileMutation,
} from "@/redux/api/userProfileApi";
import moment from "moment";
import DashboardPageSkeleton from "@/components/shared/DashboardPageSkeleton";
import useFileUpload from "@/hooks/useFileUpload";
import { toast } from "sonner";
import { TError } from "@/types";
import { Error_Modal } from "@/components/modals/modals";
import LoadingSpain from "@/components/loaders/LoadingSpain";

type Client = {
  name: string;
  dob: Date | null;
  information: string;
};

const FamilyUserProfileContainer = () => {
  const [fileName, setFileName] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { data: userProfileData, isLoading: isProfileDataLoading } =
    useGetUserProfileQuery(undefined);
  const [upload] = useFileUpload();
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateFamilyProfileMutation();

  const user = userProfileData?.data;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  // input profile image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const file = input.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFileName(file);
    } else {
      setImageUrl(null); // Clear the image URL if no file was selected
      setFileName(null);
    }

    // Reset the input value to allow selecting the same file again
    input.value = "";
  };

  // dynamic add input field for clients
  const [clients, setClients] = useState<Client[]>(
    user?.familyUser?.clients || [{ name: "", age: "", characteristics: [] }]
  );

  const addClient = () => {
    setClients([...clients, { name: "", dob: null, information: "" }]);
  };

  const removeClient = (index: number) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  const updateClient = (index: number, field: keyof Client, value: any) => {
    const updatedClients = [...clients];
    updatedClients[index][field] = value;
    setClients(updatedClients);
  };

  const onSubmit = async (data: any) => {
    const formatted = {
      personName: data?.name,
      personPhoneNumber: data?.phoneNumber,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      area: data?.area,
      zipCode: data?.zipCode,
      houseNo: data?.house,
      petCount: Number(data?.petCount),
      petDetails: data?.petDetails,
      household: data?.household,
      clients: clients?.map((client) => ({
        name: client?.name,
        dob: client?.dob ? moment(client?.dob).format("YYYY-MM-DD") : null,
        information: client?.information,
      })),
      emergencyContact: {
        name: data?.emergencyPersonName,
        mobileNumber: data?.emergencyPersonPhoneNumber,
      },
      primaryCareGiver: {
        firstName: data?.primaryParentFirstName,
        lastName: data?.primaryParentLastName,
        mobileNo: data?.primaryParentPhoneNumber,
      },
      secondaryCareGiver: {
        firstName: data?.secondaryParentFirstName,
        lastName: data?.secondaryParentLastName,
        mobileNo: data?.secondaryParentPhoneNumber,
      },
    };

    try {
      if (fileName && imageUrl) {
        // @ts-ignore
        const fileRes = await upload(fileName as File);
        await updateProfile({
          ...formatted,
          profilePicture: fileRes?.data?.url,
        }).unwrap();
        toast.success("Profile updated successfully.");
        setFileName(null);
        setImageUrl(null);
        return;
      }

      const res = await updateProfile(formatted).unwrap();
      toast.success("Profile updated successfully.");
    } catch (err: TError | any) {
      Error_Modal({ title: err?.data?.message });
    }
  };

  useEffect(() => {
    setValue("name", user?.familyUser?.personName);
    setValue("phoneNumber", user?.familyUser?.personPhoneNumber);
    setValue("country", user?.country);
    setValue("state", user?.state);
    setValue("city", user?.city);
    setValue("area", user?.area);
    setValue("zipCode", user?.zipCode);
    setValue("house", user?.houseNo);
    setValue("petCount", user?.familyUser?.petCount);
    setValue("petDetails", user?.familyUser?.petDetails);
    setValue("petDetails", user?.familyUser?.petDetails);
    setValue("household", user?.familyUser?.household);
    setValue("emergencyPersonName", user?.familyUser?.emergencyContact?.name);
    setValue(
      "emergencyPersonPhoneNumber",
      user?.familyUser?.emergencyContact?.mobileNumber
    );
    setValue(
      "primaryParentFirstName",
      user?.familyUser?.primaryCareGiver?.firstName
    );
    setValue(
      "primaryParentLastName",
      user?.familyUser?.primaryCareGiver?.lastName
    );
    setValue(
      "primaryParentPhoneNumber",
      user?.familyUser?.primaryCareGiver?.mobileNo
    );
    setValue(
      "secondaryParentFirstName",
      user?.familyUser?.secondaryCareGiver?.firstName
    );
    setValue(
      "secondaryParentLastName",
      user?.familyUser?.secondaryCareGiver?.lastName
    );
    setValue(
      "secondaryParentPhoneNumber",
      user?.familyUser?.secondaryCareGiver?.mobileNo
    );
    setClients(user?.familyUser?.clients || []);
  }, [user]);

  return isProfileDataLoading ? (
    <DashboardPageSkeleton></DashboardPageSkeleton>
  ) : (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-16" onSubmit={handleSubmit(onSubmit)}>
        {/*------------------- personal info ------------------ */}
        <div className="flex flex-col-reverse justify-center items-center md:items-start md:flex-row gap-x-8 gap-y-6">
          <div className="md:flex-1 w-full space-y-8">
            {/* `---- input E-mail ---- */}
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

            <div>
              <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
                {/* `---- input  person's name ---- */}
                <div className="grid w-full  items-center gap-1.5">
                  <Label className="font-semibold text-lg text-primary-black/80">
                    Name
                  </Label>
                  <Input
                    defaultValue={user?.familyUser?.personName}
                    type="text"
                    id="name"
                    placeholder="enter person’s name"
                    className="w-full py-5 bg-primary-light-gray"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                {/* `---- input  Phone Number ---- */}
                <div className="grid w-full  items-center gap-1.5">
                  <Label className="font-semibold text-lg text-primary-black/80">
                    Phone Number
                  </Label>
                  {/* user phone number */}

                  <Controller
                    // @ts-ignore
                    name="phoneNumber"
                    rules={{ required: "Phone number is required" }}
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        // @ts-ignore
                        value={
                          user?.familyUser?.personPhoneNumber || field.value
                        }
                        onChange={field.onChange}
                        international
                        defaultCountry="US"
                      />
                    )}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-600">
                      {errors.phoneNumber.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* ---- Primary Parent & Secondary Caregiver ---- */}

              <div className="mt-8 flex flex-col md:flex-row gap-x-7 gap-y-5">
                {/*  --------- Primary Caregiver --------*/}
                <div className="space-y-3 flex-1">
                  <h1 className="text-xl font-semibold text-primary-blue ">
                    Primary Caregiver
                  </h1>
                  {/* `---- input  First Name ---- */}
                  <div className="grid w-full  items-center gap-1.5">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      First Name
                    </Label>
                    <Input
                      defaultValue={
                        user?.familyUser?.primaryCareGiver?.firstName
                      }
                      type="text"
                      id="primaryParentFirstName"
                      placeholder="enter caregiver 1 first name"
                      className="w-full py-5 bg-primary-light-gray"
                      {...register("primaryParentFirstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors.primaryParentFirstName && (
                      <p className="text-xs text-red-600">
                        {errors.primaryParentFirstName.message as string}
                      </p>
                    )}
                  </div>

                  {/* `---- input Last Name ---- */}
                  <div className="grid w-full  items-center gap-1.5">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      Last Name
                    </Label>
                    <Input
                      defaultValue={
                        user?.familyUser?.primaryCareGiver?.lastName
                      }
                      type="text"
                      id="primaryParentLastName"
                      placeholder="enter caregiver 1 last name"
                      className="w-full py-5 bg-primary-light-gray"
                      {...register("primaryParentLastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.primaryParentLastName && (
                      <p className="text-xs text-red-600">
                        {errors.primaryParentLastName.message as string}
                      </p>
                    )}
                  </div>

                  {/* user phone number */}
                  <div className="mb-2 space-y-1">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      Mobile Number
                    </Label>
                    <Controller
                      // @ts-ignore
                      name="primaryParentPhoneNumber"
                      rules={{ required: "Phone number is required" }}
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          // @ts-ignore
                          value={
                            user?.familyUser?.primaryCareGiver?.mobileNo ||
                            field.value
                          }
                          onChange={field.onChange}
                          international
                          defaultCountry="US"
                        />
                      )}
                    />
                    {errors.primaryParentPhoneNumber && (
                      <p className="text-xs text-red-600">
                        {errors.primaryParentPhoneNumber.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/*  --------- Secondary Caregiver --------*/}
                <div className="space-y-3 flex-1">
                  <h1 className="text-xl font-semibold text-primary-blue ">
                    Secondary Caregiver
                  </h1>
                  {/* `---- input  First Name ---- */}
                  <div className="grid w-full  items-center gap-1.5">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      First Name
                    </Label>
                    <Input
                      defaultValue={
                        user?.familyUser?.secondaryCareGiver?.firstName
                      }
                      type="text"
                      id="secondaryParentFirstName"
                      placeholder="enter caregiver 2 first name"
                      className="w-full py-5 bg-primary-light-gray"
                      {...register("secondaryParentFirstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors?.secondaryParentFirstName && (
                      <p className="text-xs text-red-600">
                        {errors.secondaryParentFirstName.message as string}
                      </p>
                    )}
                  </div>

                  {/* `---- input Last Name ---- */}
                  <div className="grid w-full  items-center gap-1.5">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      Last Name
                    </Label>
                    <Input
                      defaultValue={
                        user?.familyUser?.secondaryCareGiver?.lastName
                      }
                      type="text"
                      id="secondaryParentLastName"
                      placeholder="enter caregiver 2 last name"
                      className="w-full py-5 bg-primary-light-gray"
                      {...register("secondaryParentLastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors?.secondaryParentLastName && (
                      <p className="text-xs text-red-600">
                        {errors.secondaryParentLastName.message as string}
                      </p>
                    )}
                  </div>

                  {/* user phone number */}
                  <div className="mb-2 space-y-1">
                    <Label className="font-semibold text-lg text-primary-black/80">
                      Mobile Number
                    </Label>
                    <Controller
                      name="secondaryParentPhoneNumber"
                      rules={{ required: "Phone number is required" }}
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          // @ts-ignore
                          value={
                            user?.familyUser?.secondaryCareGiver?.mobileNo ||
                            field.value
                          }
                          onChange={field.onChange}
                          international
                          defaultCountry="US"
                        />
                      )}
                    />

                    {errors.secondaryParentPhoneNumber && (
                      <p className="text-xs text-red-600">
                        {errors.secondaryParentPhoneNumber.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- upload image ---- */}
          <div className="pt-6  ">
            <div className="relative">
              <Image
                src={imageUrl || user?.profilePicture}
                alt="user image"
                width={900}
                height={700}
                className="size-40 rounded-full border-2 border-primary-orange"
              ></Image>
              <div className="absolute bottom-0 right-2 z-[9]     flex flex-col items-center gap-4 w-fit">
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
              {fileName && imageUrl && (
                <div
                  className=" cursor-pointer absolute top-2 left-4 bg-primary-blue/70 rounded-md"
                  onClick={() => {
                    setFileName(null);
                    setImageUrl(null);
                  }}
                >
                  <X color="red" />
                </div>
              )}
            </div>
            <h4 className="mt-3 font-medium">Upload Profile Picture</h4>
          </div>
        </div>

        {/* ---- Emergency Contact (non-parent) ---- */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold text-primary-blue">
            Emergency Contact (non-parent)
          </h1>

          <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
            {/* `---- input  person's name ---- */}
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Person’s name
              </Label>
              <Input
                defaultValue={user?.familyUser?.emergencyContact?.name}
                type="text"
                id="emergencyPersonName"
                placeholder="enter person’s name"
                className="w-full py-5 bg-primary-light-gray"
                {...register("emergencyPersonName", {
                  required: "Name is required",
                })}
              />
              {errors.emergencyPersonName && (
                <p className="text-red-500">
                  {errors.emergencyPersonName.message as string}
                </p>
              )}
            </div>

            {/* `---- input  Phone Number ---- */}
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Person’s Phone Number
              </Label>
              {/* user phone number */}

              <Controller
                // @ts-ignore
                name="emergencyPersonPhoneNumber"
                // rules={{ required: "Phone number is required" }}
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    // @ts-ignore
                    value={
                      user?.familyUser?.emergencyContact?.mobileNumber ||
                      field.value
                    }
                    onChange={field.onChange}
                    international
                    defaultCountry="US"
                  />
                )}
              />
            </div>
          </div>
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

          <div></div>
        </div>

        {/* ---- Additional Information ---- */}
        <div className="space-y-5">
          {/* <h1 className="text-2xl font-semibold text-primary-blue">
            Additional Information
          </h1> */}

          {/* ---- input   Household Details & Pet Details ---- */}
          <div className="flex flex-col md:flex-row gap-x-7 items-start gap-y-5">
            {/* ---- input   Pet Details ---- */}
            {/* <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Number of Pets
              </Label>
              <Input
                defaultValue={user?.familyUser?.petCount}
                type="number"
                id="numberOfPet"
                className="w-full py-5 bg-primary-light-gray"
                {...register("petCount")}
              ></Input>
              <Label className="font-semibold text-lg text-primary-black/80">
                Pet Details
              </Label>
              <Textarea
                defaultValue={user?.familyUser?.petDetails}
                rows={5}
                id="petDetails"
                className="w-full  bg-primary-light-gray"
                {...register("petDetails")}
              />
            </div> */}

            {/* ---- input   Household Details ---- */}
            {/* <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Household Details
              </Label>
              <Textarea
                defaultValue={user?.familyUser?.household}
                rows={5}
                id="householdDetails"
                className="w-full  bg-primary-light-gray"
                {...register("householdDetails")}
              />
            </div> */}
          </div>
        </div>

        {/* Client Information */}
        <div className="space-y-5">
          {/* Client Information Header */}
          <div className="flex justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-semibold text-primary-blue">
              Client's Profile
            </h1>
            <Button
              type="button"
              className="bg-primary-orange group"
              onClick={addClient}
            >
              <Plus size={20} className="mr-1 group-hover:animate-bounce" />
              Add another client
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
                {/* Input Client’s Name */}
                <div className="grid w-full items-center gap-1.5">
                  <Label className="font-semibold text-lg text-primary-black/80">
                    {index > 0 && index + 1 + "."} Client's Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Client’s name"
                    value={client.name}
                    onChange={(e) =>
                      updateClient(index, "name", e.target.value)
                    }
                    className="w-full py-5 bg-primary-light-gray"
                  />
                </div>

                {/* Input Client's Birthday */}
                <div className="grid w-full items-center gap-1.5">
                  <Label className="font-semibold text-lg text-primary-black/80">
                    Client's Birthday
                  </Label>
                  <DatePicker
                    name="dob"
                    control={control}
                    defaultValue={moment(client?.dob).format("ll")}
                    // label="Date of Birth"
                    onChange={(date) => updateClient(index, "dob", date)}
                  />
                </div>
              </div>

              {/* Input Client’s Info */}
              <div className="grid w-full items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  Client's Information
                </Label>
                <Textarea
                  rows={3}
                  placeholder="Interests, Allergies or Medical Conditions"
                  value={client.information}
                  onChange={(e) =>
                    updateClient(index, "information", e.target.value)
                  }
                  className="w-full bg-primary-light-gray"
                />
              </div>
            </div>
          ))}
        </div>
        <Button
          disabled={isUpdateProfileLoading}
          type="submit"
          className="w-full bg-primary-orange"
        >
          {isUpdateProfileLoading && (
            <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
          )}
          Save Change
        </Button>
      </form>
    </div>
  );
};

export default FamilyUserProfileContainer;
