"use client";
import { getMessaging, onMessage } from "firebase/messaging";
import React, { useEffect } from "react";
import { firebaseApp } from "../firebase/firebase";

// import CustomToast from "@components/CustomToast";
import useFcmToken from "@/hooks/useFcmToken";
import { useGetNotificationsQuery } from "@/redux/api/notificationApi";
import {
  useGetUserProfileQuery,
  useUpdateFamilyProfileMutation,
  useUpdateSitterProfileMutation,
} from "@/redux/api/userProfileApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import CustomToast from "@/components/shared/CustomToast";
const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const userData: any = useAppSelector((state) => state.auth.user);

  const { refetch } = useGetNotificationsQuery(undefined);
  const [updateProfileSitter] = useUpdateSitterProfileMutation();
  const [updateProfileFamilyUser] = useUpdateFamilyProfileMutation();
  const { data, isLoading } = useGetUserProfileQuery(undefined, {
    skip: !userData,
  });
  const user = data?.data;
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (fcmToken && notificationPermissionStatus === "granted" && !isLoading) {
      const data = {
        fcmToken: fcmToken,
      };
      refetch();

      if (userData?.role === "FAMILY_USER") {
        updateProfileFamilyUser(data);
        return;
      } else {
        updateProfileSitter(data);
      }

      //   updateProfile(formData);
    }
  }, [
    fcmToken,
    notificationPermissionStatus,
    updateProfileSitter,
    updateProfileFamilyUser,
    isLoading,
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload.notification?.title && payload.notification?.body) {
          refetch();
          toast.custom((t) => (
            <CustomToast
              title={payload.notification?.title}
              body={payload.notification?.body}
            />
          ));
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [refetch]);

  return <>{children}</>;
};

export default FirebaseProvider;
