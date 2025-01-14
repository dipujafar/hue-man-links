import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const LoadingSpain = ({
  size,
  className,
  color,
}: {
  size?: number;
  className?: string;
  color?: string;
}) => {
  return (
    <Loader
      size={size || 20}
      className={cn("animate-spin", className)}
      color={color || "#e67572"}
    ></Loader>
  );
};

export default LoadingSpain;
