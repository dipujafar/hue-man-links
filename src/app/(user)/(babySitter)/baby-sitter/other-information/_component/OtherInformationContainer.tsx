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
import { Button } from "@/components/ui/button";
import {
  useGetUserProfileQuery,
  useUpdateSitterProfileMutation,
} from "@/redux/api/userProfileApi";
import DashboardPageSkeleton from "@/components/shared/DashboardPageSkeleton";
import { useEffect } from "react";
import { toast } from "sonner";
import { Error_Modal } from "@/components/modals/modals";
import LoadingSpain from "@/components/loaders/LoadingSpain";

const OtherInformationContainer = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateSitterProfileMutation();

  const { data: userData, isLoading: isUserDataLoading } =
    useGetUserProfileQuery(undefined);
  const user = userData?.data;

  const onSubmit = async (data: any) => {
    const formatted = {
      skills: data.skills,
      languages: data.languages,
      education: data.education,
      unrestrictedHours: data.unrestrictedHours,
      occupation: data.occupation,
      experience: data.experience,
      bio: data.bio,
    };

    try {
      await updateProfile(formatted).unwrap();
      toast.success("Profile updated successfully.");
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  useEffect(() => {
    if (user) {
      // setValue("skills", user?.babysitter?.skills);
      // setValue("languages", user?.babysitter?.languages?.split(","));
      setValue("education", user?.babysitter?.education);
      setValue("languages", user?.babysitter?.languages);
      setValue("unrestrictedHours", user?.babysitter?.unrestrictedHours);
      setValue("occupation", user?.babysitter?.occupation);
      setValue("experience", user?.babysitter?.experience);
      setValue("bio", user?.babysitter?.bio);
    }
  }, [user, setValue]);

  return isUserDataLoading ? (
    <DashboardPageSkeleton></DashboardPageSkeleton>
  ) : (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-7">
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
              defaultValues={user?.babysitter?.skills}
            />
          </div>

          {/* input language */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Which language do you speak?
            </Label>

            <Input
              type="text"
              className="w-full py-5 bg-primary-light-gray"
              {...register("languages", { required: "Please enter language" })}
              defaultValue={user?.babysitter?.languages}
            />
            {errors?.language && (
              <p className="text-red-500">
                {errors?.language.message as string}
              </p>
            )}
          </div>

          {/* input education level */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              What is your level of education?
            </Label>
            <Controller
              name="education"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={user?.babysitter?.education}
                >
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
            {errors.education && (
              <p className="text-red-500">
                {errors.education.message as string}
              </p>
            )}
          </div>

          {/* `---- input  use type ---- */}
          <div className="grid w-full  items-center gap-1.5">
            <Label className="font-semibold text-lg text-primary-black/80">
              Are you a BCBA Candidate? Do you need unrestricted hours?
            </Label>
            <Input
              defaultValue={user?.babysitter?.unrestrictedHours}
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
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={user?.babysitter?.occupation}
                >
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
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={user?.babysitter?.experience}
                >
                  <SelectTrigger className="w-full py-5 bg-primary-light-gray">
                    <SelectValue placeholder="> 5 years" />
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
                defaultValue={user?.babysitter?.bio}
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

          {/* ---- Submit Button ---- */}
          <div className="flex justify-center gap-x-5 flex-wrap gap-y-2">
            <Button
              disabled={isUpdateProfileLoading}
              className="bg-primary-orange text-primary-white px-10 py-6 text-xl"
            >
              {isUpdateProfileLoading && (
                <LoadingSpain color="#fff"></LoadingSpain>
              )}
              Save Change
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtherInformationContainer;
