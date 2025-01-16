import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const PreviewImageModal = ({ open, setOpen, url }: any) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-transparent border-none">
        <div>
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage src={url} />
            <AvatarFallback className=" rounded-none">
              <Skeleton className="h-full w-full bg-[#e69191]"></Skeleton>
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewImageModal;
