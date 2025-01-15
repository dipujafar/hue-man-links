"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  History,
  LogOut,
  Settings,
  UserRoundPen,
  LibraryBig,
  StarHalf,
  BookOpenText,
  SquareChartGantt,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetUserProfileQuery } from "@/redux/api/userProfileApi";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/redux/features/authSlice";

const Family_USER_SIDEBAR_LINKS = [
  {
    key: "profile-details",
    label: "Profile Details",
    icon: <UserRoundPen />,
    href: "/family-user/profile-details",
  },
  {
    key: "my-plan",
    label: "My Plan",
    icon: <History size={25} />,
    href: "/family-user/plan",
  },
  {
    key: "my-post",
    label: "My Job Posts",
    icon: <BookOpenText size={25} />,
    href: "/family-user/my-posts",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings />,
    href: "/family-user/settings",
  },
];
const SITTER_SIDEBAR_LINKS = [
  {
    key: "profile-details",
    label: "Profile Details",
    icon: <UserRoundPen />,
    href: "/baby-sitter/profile-details",
  },
  {
    key: "others-information",
    label: "Others Information",
    icon: <LibraryBig size={25} />,
    href: "/baby-sitter/other-information",
  },
  {
    key: "manage-subscription",
    label: "Manage Subscription",
    icon: <SquareChartGantt size={25} />,
    href: "/baby-sitter/manage-subscription",
  },
  {
    key: "review-rating",
    label: "Review & Rating",
    icon: <StarHalf size={25} />,
    href: "/baby-sitter/review-rating",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <Settings />,
    href: "/baby-sitter/settings",
  },
];

const UserDashboardSidebar = () => {
  const pathname = usePathname();
  const path = pathname?.split("/")[2].split("-")[1];
  const subpath = pathname?.split("/")[2];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const user: any = useAppSelector((state) => state.auth.user);
  const { data: userProfileData, isLoading: isUserProfileDataLoading } =
    useGetUserProfileQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userProfile = userProfileData?.data;

  // // Toggle the sidebar visibility
  // const toggleSidebar = () => {
  //   setIsSidebarVisible(!isSidebarVisible);
  // };

  // Close the sidebar when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const sidebar = document.getElementById("dashboardSidebar");
    if (sidebar && !sidebar.contains(event.target as Node)) {
      setIsSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (isSidebarVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarVisible]);

  return (
    <div>
      {/* Menu Toggle Button for mobile/tablet devices */}

      {/* Sidebar */}
      <div
        id="dashboardSidebar"
        className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out xl:relative xl:transform-none xl:shadow-none  hidden xl:block`}
      >
        <div>
          {/* profile image and user info */}
          {isUserProfileDataLoading ? (
            <Skeleton className="h-[200px] mb-5 flex flex-col gap-y-2 justify-center items-center px-5">
              <Skeleton className="rounded-full bg-gray-300 size-28"></Skeleton>
              <Skeleton className=" bg-gray-300 h-5 w-full"></Skeleton>
              <Skeleton className="bg-gray-300 h-5 w-full"></Skeleton>
            </Skeleton>
          ) : (
            <div>
              {/* user profile */}
              <div className="relative mb-2">
                <Image
                  src={imageUrl || userProfile?.profilePicture}
                  alt="dummyProfile"
                  width={900}
                  height={700}
                  className="size-24 rounded-full mx-auto shadow-md"
                ></Image>
              </div>

              {/* user info */}
              <div className="text-center mb-3">
                <h5 className=" text-xl font-medium">
                  {userProfile?.familyUser?.personName ||
                    userProfile?.babysitter?.firstName +
                      " " +
                      userProfile?.babysitter?.lastName}
                </h5>
                <p className="text-primary-gray">{userProfile?.email}</p>
              </div>
            </div>
          )}

          <div className=" px-2 ">
            {user?.role === "FAMILY_USER" &&
              Family_USER_SIDEBAR_LINKS?.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className={cn(
                    "flex items-center gap-x-3 px-5 py-3 text-lg rounded text-primary-gray hover:bg-primary-gray/40 hover:text-primary-white  transition-all duration-300 ease-in-out ",
                    pathname === link.href &&
                      " bg-primary-orange text-primary-white",
                    link.href.includes(path) &&
                      " bg-primary-orange  text-primary-white",
                    link.href.includes(subpath) &&
                      " bg-primary-orange  text-primary-white"
                  )}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}

            {user?.role === "BABY_SITTER" &&
              SITTER_SIDEBAR_LINKS?.map((link) => (
                <Link
                  href={link.href}
                  key={link.key}
                  className={cn(
                    "flex items-center gap-x-3 px-5 py-3 text-lg rounded text-primary-gray hover:bg-primary-gray/40 hover:text-primary-white  transition-all duration-300 ease-in-out ",
                    pathname === link.href &&
                      " bg-primary-orange text-primary-white",
                    link.href.includes(path) &&
                      " bg-primary-orange  text-primary-white",
                    link.href.includes(subpath) &&
                      " bg-primary-orange  text-primary-white"
                  )}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}

            <button
              onClick={() => {
                dispatch(logout());
                router.refresh();
              }}
              className="flex items-center gap-x-3 px-5 py-4 text-lg rounded text-primary-gray hover:bg-primary-gray/40 hover:text-primary-white  transition-all duration-300 ease-in-out w-full"
            >
              <LogOut size={25} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* for small screens */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full xl:hidden relative"
      >
        <CarouselContent className="mx-3">
          {user?.role === "FAMILY_USER" &&
            Family_USER_SIDEBAR_LINKS?.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className={cn(
                  "flex flex-col items-center gap-x-3 px-5 py-2 text-lg rounded text-primary-gray    transition-all duration-300 ease-in-out ",
                  pathname === link.href && "  text-primary-orange",
                  link.href.includes(path) && "   text-primary-orange",
                  link.href.includes(subpath) && "   text-primary-orange"
                )}
              >
                {link.icon}
                <span className="truncate">{link.label}</span>
              </Link>
            ))}

          {user?.role === "BABY_SITTER" &&
            SITTER_SIDEBAR_LINKS?.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className={cn(
                  "flex flex-col items-center gap-x-3 px-5 py-2 text-lg rounded text-primary-gray    transition-all duration-300 ease-in-out ",
                  pathname === link.href && " text-primary-orange",
                  link.href.includes(path) && "text-primary-orange",
                  link.href.includes(subpath) && "text-primary-orange"
                )}
              >
                {link.icon}
                <span className="truncate">{link.label}</span>
              </Link>
            ))}

          <button
            onClick={() => {
              dispatch(logout());
              router.refresh();
            }}
            className="flex flex-col items-center gap-x-3 px-5 py-2 text-lg rounded text-primary-gray hover:bg-primary-gray/40 hover:text-primary-white  transition-all duration-300 ease-in-out"
          >
            <LogOut size={25} />
            <span>Logout</span>
          </button>
        </CarouselContent>
        <CarouselPrevious className="text-white bg-primary-orange absolute -left-3  md:size-8 size-6 p-1 hover:bg-gray-700" />
        <CarouselNext className="text-white bg-primary-orange absolute -right-3 md:size-8 size-6 p-1 hover:bg-gray-700" />
      </Carousel>
    </div>
  );
};

export default UserDashboardSidebar;
