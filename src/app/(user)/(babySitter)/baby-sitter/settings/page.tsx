import ChangePasswordForm from "@/components/shared/UserProfile/ChangePasswordForm";
export const metadata = {
  title: "Change Password",
  description: "Settings page of BabySitter",
};

const BabySitterSettingPage = () => {
  return (
    <div>
      <ChangePasswordForm></ChangePasswordForm>
    </div>
  );
};

export default BabySitterSettingPage;
