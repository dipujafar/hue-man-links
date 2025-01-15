import React from "react";

const ReceiverMsgCard = ({
  message,
  files,
}: {
  message: string;
  files: string[] | null;
}) => {
  return (
    <div className="max-w-max rounded-xl border bg-[#DFE1E3] px-3 py-1">
      {files &&
        files?.length > 0 &&
        files?.map((file, index) => (
          <img
            key={index}
            src={file}
            alt={`file-${index}`}
            className="w-24 h-24"
          />
        ))}
      <p className="text-primary-black">{message}</p>
    </div>
  );
};

export default ReceiverMsgCard;
