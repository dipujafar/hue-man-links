"use client";
import { Label } from "@radix-ui/react-menubar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { skills } from "@/utils/sitterSkill";
import { Controller, useForm } from "react-hook-form";
import MultipleSelect from "@/components/ui/multiple-select";
import { educationLevels } from "@/utils/educationLavel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash2, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useFileUpload from "@/hooks/useFileUpload";
import LoadingSpain from "@/components/loaders/LoadingSpain";
import { useCreateSitterMutation } from "@/redux/api/createUserApi";
import { Error_Modal } from "@/components/modals/modals";
import { TError } from "@/types";
import VerifyOtpModal from "@/components/shared/VerifyOtpModal";
import Link from "next/link";

const ConfirmBabySitterForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [backgroundDocFile, setBackgroundDocFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const router = useRouter();
  const [upload, isUploading] = useFileUpload();
  const [createSitter, { isLoading: isCreatingSitter }] =
    useCreateSitterMutation();
  const [email, setEmail] = useState("");
  const [showVerify, setShowVerify] = useState(false);

  const handleUploadResume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResumeFile(event.target.files?.[0] || null);
    event.target.value = "";
  };
  const handleUploadBackgroundDoc = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundDocFile(event.target.files?.[0] || null);
    event.target.value = "";
  };

  const onSubmit = async (data: any) => {
    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }
    if (data?.languages?.length === 0) {
      toast.error("Please select at least one language.");
      return;
    }
    if (data?.skills?.length <= 2) {
      toast.error("Please select at least three skill.");
      return;
    }

    toast.loading("processing...");

    // @ts-ignore
    const resumeFileRes = await upload(resumeFile as File);

    if (backgroundDocFile) {
      // @ts-ignore
      var backgroundDocFileRes = await upload(resumeFile as File);
    }

    const previousDataFromSession = sessionStorage.getItem("sitterData");
    const previousData =
      previousDataFromSession && JSON.parse(previousDataFromSession);

    const formattedData = {
      ...previousData,
      skills: data?.skills,
      languages: data?.languages?.join(", "),
      education: data?.education,
      experience: data?.experience,
      unrestrictedHours: data?.unrestrictedHours,
      occupation: data?.occupation,
      bio: data?.bio,
      password: data?.password,
      resume: resumeFileRes?.data?.url,
      backgroundDescription: backgroundDocFileRes?.data?.url,
      isAdult: true,
      membership: "SITTER",
    };

    try {
      const res = await createSitter(formattedData).unwrap();

      if (res?.data?.token) {
        sessionStorage.setItem("signUpToken", res?.data?.token);
        setEmail(previousData?.email);
        setShowVerify(true);
        sessionStorage.removeItem("sitterData");
        toast.dismiss();
      }
    } catch (error: TError | any) {
      toast.dismiss();
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:space-y-7 space-y-5 ">
          {/* input skill */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              What are your skill sets to make your sitting session memorable
            </Label>
            <MultipleSelect
              name="skills"
              control={control}
              options={skills}
              placeholder="select 3 words"
            />
          </div>

          {/* input language */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Which language do you speak?
            </Label>
            <MultipleSelect
              name="languages"
              control={control}
              options={["Spanish", "English"]}
              placeholder="select languages"
            />
          </div>

          {/* input education level */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              What is your level of education?
            </Label>

            <Controller
              name="education"
              control={control}
              rules={{ required: "Education is required" }}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full py-5 bg-primary-light-gray">
                    <SelectValue placeholder="select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {educationLevels?.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.education && (
              <p className="text-red-500">
                {errors?.education.message as string}
              </p>
            )}
          </div>

          {/* `---- input  use type ---- */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Are you a BCBA Candidate? Do you need unrestricted hours?
            </Label>
            <Input
              type="text"
              className="w-full py-5 bg-primary-light-gray"
              {...register("unrestrictedHours")}
            />
          </div>

          {/* input occupation */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              What is your occupation?
            </Label>
            <Controller
              name="occupation"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full py-5 bg-primary-light-gray">
                    <SelectValue placeholder="select your occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="RBT">RBT</SelectItem>
                      <SelectItem value="Special Education Teacher">
                        Special Education Teacher
                      </SelectItem>
                      <SelectItem value="Paraprofessional">
                        Paraprofessional
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.occupation && (
              <p className="text-red-500">
                {errors.occupation?.message as string}
              </p>
            )}
          </div>

          {/* input experience */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              How many years of sitting experience do you have?
            </Label>
            <Controller
              name="experience"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full py-5 bg-primary-light-gray">
                    <SelectValue placeholder="select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[...Array(10)]?.map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1} years
                        </SelectItem>
                      ))}
                      <SelectItem value={"10+"}>more than 10 years</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.experience && (
              <p className="text-red-500">
                {errors.experience?.message as string}
              </p>
            )}
          </div>

          {/* input about yourself */}
          <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
            {/* ---- input   Household Details ---- */}
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Tell a little about yourself, so families can get to know you.
              </Label>
              <Textarea
                rows={5}
                id="yourself"
                className="w-full  bg-primary-light-gray "
                placeholder="Write your description"
                {...register("bio", { required: "Required" })}
              />
              {
                <p className="text-red-500">
                  {errors.bio && (errors.bio.message as string)}
                </p>
              }
            </div>
          </div>

          {/* resume */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Resume
            </Label>
            <div className="bg-primary-light-gray py-10 w-full border-2 border-dashed flex justify-center items-center flex-col">
              <Button
                variant="outline"
                type="button"
                className="w-fit h-fit flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 border-none shadow-none bg-transparent p-0 "
              >
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleUploadResume}
                  accept=".pdf, .doc, .docx, .application/pdf, .application/msword, .application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <UploadIcon color="#FF8A00" />
                  <span className="text-sm text-primary-orange">Upload</span>
                </label>
              </Button>
              {resumeFile && (
                <div className="mt-2 flex justify-center items-center gap-x-2">
                  <p className="max-w-[250px] truncate">{resumeFile.name}</p>
                  <Trash2
                    size={18}
                    color="red"
                    onClick={() => setResumeFile(null)}
                    className="cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Background Check Documentation validation */}
          <div className="flex flex-col md:flex-row gap-x-7 gap-y-5">
            {/* ---- input   Household Details ---- */}
            <div className="grid w-full  items-center gap-1.5">
              <Label className="font-semibold text-lg text-primary-black/80">
                Background Check Documentation
              </Label>
              <p className="text-primary-black/75">
                Please complete a background check at your local police
                department or obtain a copy from your employer, if available.
              </p>
              <div className="bg-primary-light-gray py-10 w-full border-2 border-dashed flex justify-center items-center flex-col">
                <Button
                  variant="outline"
                  type="button"
                  className="w-fit h-fit flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 border-none shadow-none bg-transparent p-0 "
                >
                  <input
                    type="file"
                    id="docInput"
                    className="hidden"
                    onChange={handleUploadBackgroundDoc}
                    accept=".pdf, .doc, .docx, .application/pdf, .application/msword, .application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  />
                  <label
                    htmlFor="docInput"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <UploadIcon color="#FF8A00" />
                    <span className="text-sm text-primary-orange">Upload</span>
                  </label>
                </Button>
                {backgroundDocFile && (
                  <div className="mt-2 flex justify-center items-center gap-x-2">
                    <p className="max-w-[250px] truncate">
                      {backgroundDocFile.name}
                    </p>
                    <Trash2
                      size={18}
                      color="red"
                      onClick={() => setBackgroundDocFile(null)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <h4 className="text-2xl font-semibold text-primary-blue">
            For just $10 a month, you can apply for as many jobs as you like!
          </h4>

          {/* ---- Credit Card ---- */}
          {/* <div className="space-y-7">
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
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-primary-orange text-primary-white px-10 py-6 text-xl"
              disabled={
                !acceptTerms || isCreatingSitter || (isUploading as boolean)
              }
            >
              {isCreatingSitter ||
                (isUploading && (
                  <LoadingSpain color="#fff" className="mr-2"></LoadingSpain>
                ))}
              Create
            </Button>
          </div>
        </div>
      </form>
      <VerifyOtpModal
        open={showVerify}
        setOpen={setShowVerify}
        email={email}
      ></VerifyOtpModal>
    </div>
  );
};

export default ConfirmBabySitterForm;
