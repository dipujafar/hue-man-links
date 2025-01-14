import Container from "@/components/shared/Container";
import UserNavbar from "@/components/shared/UserNavbar";

import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <nav>
        <UserNavbar></UserNavbar>
      </nav>
      {children}
    </Container>
  );
};

export default UserLayout;
