import CustomAvatar from "@/components/shared/CustomAvatar";
import { cn } from "@/lib/utils";
import { calculateTime } from "@/utils/calculateTime";

const UserCard = ({
  user,
  setSelectedUser,
  selectedUserId,
}: {
  user: any;
  setSelectedUser: any;
  selectedUserId: string;
}) => {
  console.log(user);
  return (
    <div
      className={cn(
        `flex items-center xl:gap-x-2 lg:gap-x-1 gap-x-2 cursor-pointer  px-1`,
        selectedUserId == user?.userData?.userId &&
          "bg-primary-orange py-2 rounded text-white"
      )}
      onClick={() => setSelectedUser(user)}
    >
      <div>
        <CustomAvatar
          img={user?.userData?.profilePicture}
          name={
            user?.userData?.familyUser?.personName ||
            user?.userData?.babysitter?.firstName
          }
          className="lg:size-8 size-10 xl:size-10   rounded-full "
        ></CustomAvatar>
        {/* <Image
          src={user?.userData?.profilePicture}
          alt={"profile_picture"}
          width={1200}
          height={1200}
          quality={100}
          className="size-10 rounded-full "
        /> */}
      </div>

      <div className="flex-grow ">
        <div className="flex items-center justify-between gap-x-2">
          <h4
            className={cn(
              "lg:text-[14px] text-base xl:text-base  font-medium text-primary-black truncate lg:max-w-[150px] xl:max-w-[120px] 2xl:max-w-[180px]",
              selectedUserId == user?.userData?.userId && "text-white"
            )}
          >
            {user?.userData?.familyUser?.personName ||
              user?.userData?.babysitter?.firstName +
                " " +
                user?.userData?.babysitter?.lastName}{" "}
          </h4>
          <p
            className={cn(
              "font-semibold text-secondary-2 text-primary-gray truncate text-[12px] lg:text-[10px] xl:text-[12px]",
              selectedUserId == user?.userData?.userId && "text-gray-200"
            )}
          >
            {calculateTime(user?.message?.createdAt)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p
            className={cn(
              "text-ellipsis text-[12px]  xl:text-[12px] lg:text-[10px]",
              user?.unseen && "font-semibold"
            )}
          >
            {user?.message?.content && user?.message?.content?.length > 34
              ? user?.message?.content?.slice(0, 34) + "..."
              : user?.message?.content || ""}

            {!user?.message?.content &&
              user?.message?.files?.length > 0 &&
              user?.message?.files?.length +
                " " +
                (user?.message?.files?.length > 1 ? "Images" : "Image")}
          </p>
          {/* unseen message */}
          <p
            className={cn(
              "text-[10px] px-1 bg-primary-orange rounded-full text-white",
              selectedUserId == user?.userData?.userId && "hidden"
            )}
          >
            {user?.unseenMessage ? user?.unseenMessage : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
