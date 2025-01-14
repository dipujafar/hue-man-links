import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const CustomAvatar = ({
  img,
  name,
  className,
}: {
  img: any;
  name: string;
  className?: string;
}) => {
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={img?.src || img} />
      <AvatarFallback className="bg-gray-300">
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
