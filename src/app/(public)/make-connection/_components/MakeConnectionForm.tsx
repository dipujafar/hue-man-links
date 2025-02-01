"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ImageIcon, Info, Plus, X } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memberShipPlans } from "@/lib/memberShipPlan";
import { Checkbox } from "@/components/ui/checkbox";
import CountryStateCitySelector from "@/components/ui/CountryStateCitySelector";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { DatePicker } from "@/components/ui/date-picker";
import dummyProfile from "@/assets/Images/make-connect/dummyProfile.png";
import { useCreateUserMutation } from "@/redux/api/createUserApi";
import useFileUpload from "@/hooks/useFileUpload";
import { toast } from "sonner";
import VerifyOtpModal from "@/components/shared/VerifyOtpModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import { Error_Modal } from "@/components/modals/modals";
import { TError } from "@/types";

type Client = {
  name: string;
  dob: Date | null;
  information: string;
};

const MakeConnectionForm = () => {
  const [showVerify, setShowVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();
  const [upload, isUploading] = useFileUpload();
  const router = useRouter();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
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
      setImageFile(file);
    } else {
      setImageUrl(null); // Clear the image URL if no file was selected
      setImageFile(null);
    }

    // Reset the input value to allow selecting the same file again
    input.value = "";
  };

  // dynamic add input field for clients
  const [clients, setClients] = useState<Client[]>([
    { name: "", dob: null, information: "" },
  ]);

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

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!imageFile && !imageUrl) {
      toast.error("Please upload a profile image.");
      return;
    }
    toast.loading("processing...", { id: "createUser", duration: 10000 });
    // @ts-ignore
    const fileRes = await upload(imageFile as File);

    const formattedData = {
      email: data.email,
      password: data.password,
      profilePicture: fileRes.data.url,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      area: data?.area,
      houseNo: data?.house,
      zipCode: data?.zipCode,
      household: "nothing",
      personName: data?.personName,
      personPhoneNumber: data?.personPhoneNumber,
      petDetails: "nothing",
      petCount: Number("12"),
      hearFrom: data?.hearFrom,
      membership: data?.membershipPlan,
      clients: clients,
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
      const res = await createUser(formattedData).unwrap();

      if (res?.data?.token) {
        sessionStorage.setItem("signUpToken", res?.data?.token);
        setEmail(data?.email);
        setShowVerify(true);
        setImageFile(null);
        setImageUrl(null);
      }
      toast.dismiss("createUser");
    } catch (error: TError | any) {
      toast.dismiss("createUser");
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
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
                type="email"
                id="email"
                placeholder="example@ex.com"
                className="w-full py-5 bg-primary-light-gray "
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors?.email && (
                <p className="text-sm text-red-500">
                  {errors?.email?.message as string}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
              {/* `---- input  person's name ---- */}
              <div className="grid w-full  items-center gap-1.5">
                <Label className="font-semibold text-lg text-primary-black/80">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="enter person’s name"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("personName", { required: "Name is required" })}
                />
                {errors.personName && (
                  <p className="text-xs text-red-600">
                    {errors.personName.message as string}
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
                  name="personPhoneNumber"
                  rules={{ required: "Phone number is required" }}
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      // @ts-ignore
                      value={field.value}
                      onChange={field.onChange}
                      international
                      defaultCountry="US"
                    />
                  )}
                />
                {errors.personPhoneNumber && (
                  <p className="text-xs text-red-600">
                    {errors.personPhoneNumber.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* ---- Primary Parent & Secondary Caregiver ---- */}

            <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
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
                    // rules={{ required: "Phone number is required" }}
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        // @ts-ignore
                        value={field.value}
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
                    type="text"
                    id="secondaryParentFirstName"
                    placeholder="enter caregiver 2 first name"
                    className="w-full py-5 bg-primary-light-gray"
                    {...register("secondaryParentFirstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.secondaryParentFirstName && (
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
                    type="text"
                    id="secondaryParentLastName"
                    placeholder="enter caregiver 2 last name"
                    className="w-full py-5 bg-primary-light-gray"
                    {...register("secondaryParentLastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.secondaryParentLastName && (
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
                    // @ts-ignore
                    name="secondaryParentPhoneNumber"
                    // rules={{ required: "Phone number is required" }}
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        // @ts-ignore
                        value={field.value}
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

          {/* ---- upload image ---- */}
          <div className="pt-6">
            <div className="relative">
              <Image
                src={imageUrl || dummyProfile}
                alt="dummyProfile"
                width={900}
                height={700}
                className="size-40 rounded-full border-2 border-primary-orange"
              ></Image>
              <div className="absolute bottom-0 right-2 flex flex-col items-center gap-4 w-fit">
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
              {imageFile && imageUrl && (
                <div
                  className=" cursor-pointer absolute top-2 left-4 bg-primary-blue/70 rounded-md"
                  onClick={() => {
                    setImageFile(null);
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
                type="text"
                id="emergencyPersonName"
                placeholder="enter person’s name"
                className="w-full py-5 bg-primary-light-gray"
                {...register("emergencyPersonName", {
                  required: "First name is required",
                })}
              />
              {errors.emergencyPersonName && (
                <p className="text-xs text-red-600">
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
                rules={{ required: "Phone number is required" }}
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    // @ts-ignore
                    value={field.value}
                    onChange={field.onChange}
                    international
                    defaultCountry="US"
                  />
                )}
              />
              {errors.emergencyPersonPhoneNumber && (
                <p className="text-xs text-red-600">
                  {errors.emergencyPersonPhoneNumber.message as string}
                </p>
              )}
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
              userAddress={{
                country: "United States",
                state: "Georgia",
                city: "",
                area: "",
                house: "12",
              }}
              register={register}
              setValue={setValue}
              errors={errors}
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
                type="number"
                id="numberOfPet"
                className="w-full py-5 bg-primary-light-gray"
                {...register("petCount")}
              ></Input>
              <Label className="font-semibold text-lg text-primary-black/80">
                Pet Details
              </Label>
              <Textarea
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
                  <X size={20} color="red" />
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
                    required
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
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---- Password ---- */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold text-primary-blue">
            Your Password
          </h1>

          <div className="flex flex-col justify-start items-start md:flex-row gap-x-7 gap-y-5">
            {/* `---- input  Password ---- */}
            <div className="grid w-full   gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="enter your password"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                      message:
                        "Password must contain an uppercase letter and a symbol",
                    },
                  })}
                />
                <div
                  className="absolute  right-3 top-1/3 -translate-y-1 transform cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye color="#555656" size={20} />
                  ) : (
                    <EyeOff color="#555656" size={20} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* ---- input  Confirm Password ---- */}
            <div className="grid w-full   gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Retype password
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="retype password"
                  className="w-full py-5 bg-primary-light-gray"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") ||
                      "Passwords do not match with New Password",
                  })}
                />
                <div
                  className="absolute right-3 top-1/3 -translate-y-1 transform cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye color="#555656" size={20} />
                  ) : (
                    <EyeOff color="#555656" size={20} />
                  )}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          {/* Which membership plan do you want? */}
          <div className="space-y-5">
            <h1 className="text-2xl font-semibold text-primary-blue">
              Which membership plan do you want?
            </h1>

            <p className="text-purple-900">
              <span className="text-primary-orange">***</span>
              Enjoy a 30-day free trial on all subscription plans! After 30
              days, subscription fee will apply to continue your access.
            </p>

            <Controller
              name="membershipPlan"
              control={control}
              rules={{ required: "Please select a membership plan." }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="space-y-2"
                  onValueChange={field.onChange} // Ensures RHF tracks changes
                >
                  {memberShipPlans.map((plan, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.value} id={`${index + 1}`} />
                      <Label className="text-xl font-medium text-primary-black/85">
                        {plan.label} $({plan.price})
                        <Link href={`/membership-pricing/#${plan.value}`}>
                          <Info
                            size={20}
                            className="inline ml-4"
                            color="#f26d6d"
                          />
                        </Link>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.membershipPlan && (
              <p className="text-red-500 text-sm">
                Please select a membership plan.
              </p>
            )}
          </div>
          <div className="mt-2">
            <p className="text-primary-black/80">
              By signing up for our auto-renewing monthly membership, which will
              be charged to the card on file every 30 days. Your membership will
              continue until you choose to cancel. You can cancel at any time by
              contacting us. Please confirm by answering "yes" below if you
              agree to the terms of our auto-renewing monthly membership.
            </p>
            <Controller
              name="renew"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange} // Ensures RHF tracks changes
                >
                  {["Yes", "No"].map((plan, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={plan} id={`${index + 1}`} />
                      <Label className="text-xl font-medium text-primary-black/85">
                        {plan}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          {/* hear us */}
          <div className="grid w-full  items-center gap-1.5 mt-3">
            <Label className="font-semibold text-lg text-primary-black/80">
              How did you hear about us?
            </Label>
            <Textarea
              rows={3}
              id="hearFrom"
              className="w-full  bg-primary-light-gray"
              {...register("hearFrom")}
            />
          </div>
        </div>

        {/* ---- Credit Card ---- */}
        {/* <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-primary-blue">
              Credit Card
            </h1>
            <p className="text-primary-black/75 text-sm">
              Stripe will make two micro-deposits (less than $1.00) within the
              next two business days. To verify the bank account, you need to
              provide the two amounts that were deposited. (By Clicking the
              Verify Account button in the Payment Information section (after
              logging in to your account))
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
            `---- input Account Number ----
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Account Number
              </Label>
              <Input
                type="text"
                id="accountNumber"
                placeholder="enter account number"
                className="w-full py-5 bg-primary-light-gray "
              />
            </div>

            `---- input  routing number ----
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Routing Number
              </Label>
              <Input
                type="text"
                id="routingNumber"
                placeholder="enter routing number"
                className="w-full py-5 bg-primary-light-gray "
              />
            </div>
          </div>

          `---- input  account holder name ----
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Account Holder Name
            </Label>
            <Input
              type="text"
              id="accountHolderName"
              placeholder="enter account holder name"
              className="w-full py-5 bg-primary-light-gray "
            />
          </div>
        </div> */}

        {/* accept terms */}
        <div className="flex space-x-2">
          <Checkbox
            id="terms"
            className="text-primary-black/50"
            onCheckedChange={() => setAcceptTerms(!acceptTerms)}
          />
          <label
            htmlFor="terms"
            className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 max-w-3xl text-primary-black/70"
          >
            By checking the box, you are agreeing to Hue-man Links
            <Link href="/terms-condition" className="text-blue-700">
              {" "}
              terms and conditions.{" "}
            </Link>{" "}
            To participate, you must adhere to the guidelines, which will be
            sent to you following registration.
          </label>
        </div>

        {/* ---- Submit Button ---- */}

        <div className="flex justify-center gap-x-5 flex-wrap gap-y-2">
          <Button
            variant="outline"
            className="border-primary-orange text-primary-orange px-10 py-6 text-xl"
            onClick={() => {
              router.push("/");
            }}
            type="button"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-primary-orange text-primary-white px-10 py-6 text-xl"
            disabled={
              !acceptTerms || isCreatingUser || (isUploading as boolean)
            }
          >
            {isCreatingUser ||
              ((isUploading as boolean) && (
                <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
              ))}
            Create
          </Button>
        </div>

        <p>
          <span className="text-primary-orange">***</span>
          <span className="font-semibold"> Disclaimer: </span> The information
          provided during the sign-up process is solely for registration
          purposes. It will not be used for job postings or shared publicly in
          any way. No identifiable personal information will be posted or
          disclosed.
        </p>
      </form>
      <VerifyOtpModal
        open={showVerify}
        setOpen={setShowVerify}
        email={email}
      ></VerifyOtpModal>
    </div>
  );
};

export default MakeConnectionForm;
