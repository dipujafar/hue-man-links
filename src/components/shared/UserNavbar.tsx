"use client";
import Image from "next/image";
import {
  CalendarDays,
  Heart,
  MessageCircleMore,
  TableOfContents,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
import userDummyProfile from "@/assets/Images/make-connect/dummy_profile-removebg.png";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const sitterNavLinks = [
  {
    label: "All Jobs",
    value: "all-job-posts",
  },
  {
    label: "About",
    value: "about-us",
  },
  {
    label: "Contact Us",
    value: "connect-us",
  },
];

const userNavLinks = [
  {
    label: "Job Post",
    value: "book-babysitter-request",
  },
  {
    label: "About",
    value: "about-us",
  },
  {
    label: "Contact Us",
    value: "connect-us",
  },
];

const UserNavbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const currentPathName = pathname?.split("/")[1];
  const user: any = useAppSelector((state) => state.auth.user);
  const { data: userProfile } = useGetUserProfileQuery(undefined, {
    skip: !user?.id,
  });

  return (
    <div className={cn(className)}>
      <nav className="flex items-center justify-between gap-x-5  2xl:gap-x-36 py-4 lg:py-6">
        {/* logo image */}
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={1200}
              height={1200}
              className="xl:h-full xl:w-auto w-full md:min-w-48 h-14 lg:h-auto md:h-28  rounded-md max-h-44 md:max-w-32"
            />
          </Link>
        </div>

        {/* nav link */}
        <div className="flex flex-1 items-center justify-center gap-x-10">
          {/* navLinks */}
          <nav>
            <div className="hidden lg:flex gap-x-8">
              <ul className="  items-center gap-8 text-light-black lg:flex">
                {user?.role === "FAMILY_USER"
                  ? userNavLinks?.map((item, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          "text-lg font-medium text-primary-orange hover:text-primary-blue duration-300",
                          currentPathName === item.value
                            ? "text-primary-blue"
                            : ""
                        )}
                      >
                        <Link href={`/${item.value}`}>{item.label}</Link>
                      </li>
                    ))
                  : sitterNavLinks?.map((item, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          "text-lg font-medium text-primary-orange hover:text-primary-blue duration-300",
                          currentPathName === item.value
                            ? "text-primary-blue"
                            : ""
                        )}
                      >
                        <Link href={`/${item.value}`}>{item.label}</Link>
                      </li>
                    ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* nav icons  and user profile*/}
        <div className="hidden lg:flex items-center justify-center gap-x-5">
          {user?.role === "FAMILY_USER" && (
            <Link href={"/favorite-babysitter"}>
              <Heart
                fill={
                  currentPathName === "favorite-babysitter"
                    ? "#F26D6D"
                    : "#F2F2F2"
                }
                className={
                  currentPathName === "favorite-babysitter"
                    ? "text-primary-orange"
                    : ""
                }
              />
            </Link>
          )}

          <Link
            href={
              user?.role === "FAMILY_USER" ? "/book-sitter" : "/book-request"
            }
            className="relative"
          >
            <CalendarDays
              className={cn(
                currentPathName === "book-sitter" ||
                  currentPathName === "book-request"
                  ? "text-primary-orange"
                  : ""
              )}
            />
          </Link>
          <Link href={"/message"}>
            <MessageCircleMore
              className={cn(
                currentPathName === "message" ? "text-primary-orange" : ""
              )}
            />
          </Link>
          <Link
            href={
              user?.role === "FAMILY_USER"
                ? "/family-user/profile-details"
                : "/baby-sitter/profile-details"
            }
          >
            <Avatar className="size-12">
              <AvatarImage
                src={userProfile?.data?.profilePicture}
                alt="profile_picture"
              />
              <AvatarFallback>
                {userProfile?.data?.familyUser?.personName &&
                  userProfile?.data?.familyUser?.personName
                    ?.split(" ")[0]
                    .slice(0, 1) +
                    userProfile?.data?.familyUser?.personName
                      ?.split(" ")[1]
                      .slice(0, 1)}

                {!userProfile?.data?.familyUser?.personName && (
                  <Image
                    src={userDummyProfile}
                    alt="profile_picture"
                    className="size-12"
                  ></Image>
                )}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* small device view */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <TableOfContents color="#5F6368" size={24} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="mx-auto">
                  <div>
                    <Link href={"/"}>
                      <Image
                        src={"/logo.png"}
                        alt="logo"
                        width={1200}
                        height={1200}
                        className="h-24 w-auto"
                      />
                    </Link>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-5 grid gap-4 py-4">
                {/* navLink */}
                <div className="flex flex-1 flex-col items-center justify-center gap-y-5">
                  <nav>
                    <div className="flex flex-col gap-y-4">
                      <ul className="flex flex-col gap-y-4 pl-4 ">
                        {sitterNavLinks?.map((item, idx) => (
                          <li
                            key={idx}
                            className={cn(
                              "text-lg font-medium text-primary-orange hover:text-primary-blue duration-300",
                              currentPathName === item.value
                                ? "text-primary-blue"
                                : ""
                            )}
                          >
                            <Link href={`/${item.value}`}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </div>

                {/* nav icons  and user profile*/}
                <div className=" flex items-center justify-center gap-x-5">
                  {user?.role === "FAMILY_USER" && (
                    <Link href={"/favorite-babysitter"}>
                      <Heart
                        fill={
                          currentPathName === "favorite-babysitter"
                            ? "#F26D6D"
                            : "#F2F2F2"
                        }
                        className={
                          currentPathName === "favorite-babysitter"
                            ? "text-primary-orange"
                            : ""
                        }
                      />
                    </Link>
                  )}

                  <Link
                    href={
                      user?.role === "FAMILY_USER"
                        ? "/book-sitter"
                        : "/book-request"
                    }
                    className="relative"
                  >
                    <CalendarDays
                      className={cn(
                        currentPathName === "book-sitter" || "book-request"
                          ? "text-primary-orange"
                          : ""
                      )}
                    />
                  </Link>
                  <Link href={"/message"}>
                    <MessageCircleMore
                      className={cn(
                        currentPathName === "message"
                          ? "text-primary-orange"
                          : ""
                      )}
                    />
                  </Link>
                  <Link href={"/family-user/profile-details"}>
                    <Avatar className="size-12">
                      <AvatarImage
                        src={userProfile?.data?.profilePicture}
                        alt="profile_picture"
                      />
                      <AvatarFallback>
                        {userProfile?.data?.familyUser?.personName &&
                          userProfile?.data?.familyUser?.personName
                            ?.split(" ")[0]
                            .slice(0, 1) +
                            userProfile?.data?.familyUser?.personName
                              ?.split(" ")[1]
                              .slice(0, 1)}

                        {!userProfile?.data?.familyUser?.personName && (
                          <Image
                            src={userDummyProfile}
                            alt="profile_picture"
                            className="size-12"
                          ></Image>
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
