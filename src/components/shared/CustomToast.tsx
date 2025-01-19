import { X } from "lucide-react";
import Link from "next/link";

type TCustomToastProps = {
  title?: string;
  body?: string;
  url?: string;
  duration?: number;
};

const CustomToast = ({
  title,
  body,
  url = "/notifications",
}: TCustomToastProps) => {
  return (
    <Link href={url} className="block">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl">
        <div className="relative p-4">
          <button className="absolute right-2 top-2 text-gray-400 transition-colors hover:text-gray-600">
            <X size={20} />
            <span className="sr-only">Close</span>
          </button>
          <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{body}</p>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs text-gray-500">Click to view all</p>
        </div>
      </div>
    </Link>
  );
};

export default CustomToast;
