"use client";
import PreviewImageModal from "@/components/shared/PreviewImageModal";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { useState } from "react";

const ReceiverMsgCard = ({
  message,
  files,
}: {
  message: string;
  files: string[] | null;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  return (
    <>
      <div className="max-w-max rounded-xl border bg-[#DFE1E3] px-3 py-1">
        {files && files?.length > 0 && (
          <div
            className={cn(
              "grid grid-cols-1  gap-2",
              files?.length > 2 && "xl:grid-cols-3",
              files?.length > 1 && "grid-cols-2"
            )}
          >
            {files?.map((file, index) => (
              <Avatar
                onClick={() => {
                  setOpenPreviewModal(true);
                  setImageUrl(file);
                }}
                key={index}
                className="h-24 xl:h-28 rounded-none max-w-[250px] cursor-pointer"
              >
                <AvatarImage src={file} />
                <AvatarFallback className=" rounded-none">
                  <Skeleton className="h-24 xl:h-28 w-28 bg-[#e69191]"></Skeleton>
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
        <p className="text-primary-black break-words text-ellipsis">
          {message}
        </p>
      </div>
      <PreviewImageModal
        open={openPreviewModal}
        setOpen={setOpenPreviewModal}
        url={imageUrl}
      ></PreviewImageModal>
    </>
  );
};

export default ReceiverMsgCard;
