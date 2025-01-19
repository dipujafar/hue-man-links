"use client";

import Empty from "@/components/shared/Empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "@/redux/api/notificationApi";
import { calculateTime } from "@/utils/calculateTime";
import { Bell } from "lucide-react";
import Link from "next/link";
import { use, useEffect } from "react";

const NotificationContainer = () => {
  const { data: notifications, isLoading } = useGetNotificationsQuery({
    limit: 9999999999,
  });
  const [readNotification] = useReadNotificationMutation();

  useEffect(() => {
    if (notifications?.data?.data?.length) {
      readNotification(undefined);
    }
  }, [notifications]);

  return (
    <div>
      <div className="min-h-[78vh] max-h-[78vh] scroll-hide bg-[#eee0ec] p-7 rounded overflow-y-auto">
        <h1 className="text-2xl text-main-color font-medium">Notifications</h1>
        <hr />
        {isLoading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="md:w-1/2">
              <Skeleton className="h-[40px] mt-3"></Skeleton>
            </div>
          ))
        ) : notifications?.data?.data?.length ? (
          <div className="mt-9 grid grid-cols-1 gap-8" key={notifications?.id}>
            {notifications?.data?.data?.map(
              (notification: any, inx: number) => (
                <Link
                  href={
                    notification?.title === "New message"
                      ? `/message/?userFrom=${notification?.data?.userId}`
                      : notification?.title === "New Job Post"
                      ? `/post-details?postId=${notification?.data?.jobId}`
                      : ""
                  }
                >
                  <div key={inx} className="flex gap-4 ">
                    <div className="bg-[#e67471] p-2 rounded h-fit">
                      <Bell size={20} color="#fff" />
                    </div>
                    <div>
                      <h4 className="md:text-lg font-medium border">
                        {/* {notification.message} from {notification?.name} */}
                        {notification.title}
                      </h4>
                      <p className="text-sm">{notification?.body}</p>
                      <p className="text-[10px]">
                        {calculateTime(notification?.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <Empty message="No Notifications"></Empty>
        )}
      </div>
    </div>
  );
};

export default NotificationContainer;
