import { Metadata } from "next";
import UpgradePlanContainer from "./_components/UpgradePlanContainer";

export const metadata: Metadata = {
  title: "Upgrade Plan",
  description: "Upgrade Plan",
};

const UpgradePlanPage = () => {
  return (
    <div>
      <UpgradePlanContainer></UpgradePlanContainer>
    </div>
  );
};

export default UpgradePlanPage;
