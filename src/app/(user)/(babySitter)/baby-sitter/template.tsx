import UserDashboardSidebar from "@/components/shared/UserProfile/UserDashboardSidebar";
import React, { ReactNode } from "react";

const BabySitterTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen  py-10">
      <div className="items-start 2xl:gap-x-16 gap-x-8 xl:flex">
        <div className="xl:sticky top-0 mb-5 xl:mb-0">
          <UserDashboardSidebar></UserDashboardSidebar>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};

export default BabySitterTemplate;
