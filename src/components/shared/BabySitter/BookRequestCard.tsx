import { Card, CardContent } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import { Dot, MapPinHouse } from "lucide-react";
import { ReactNode } from "react";
import icon1 from "@/assets/icons/sitter/sitterPageIcon1.png";
import icon2 from "@/assets/icons/sitter/sitterPageIcon2.png";
import Link from "next/link";

type TDataType = {
  name: string;
  image: string | StaticImageData;
  children: number;
  location: string;
  age: number;

  description: string;
};

const BookRequestCard = ({
  data,
  children,
}: {
  data: TDataType;
  children?: ReactNode;
}) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="flex flex-col lg:flex-row lg:items-start justify-center items-center  gap-6 pt-6">
        {/* image and rating */}
        <div className="flex flex-col justify-center items-center gap-y-2">
          <Link href={`/family-user/${data?.name}`}>
            <Image
              src={data?.image}
              alt="baby sitter"
              width={1000}
              height={900}
              className="lg:size-36 size-52"
            ></Image>
          </Link>
        </div>

        {/* name, address, description */}
        <div className="flex-1 flex flex-col   gap-y-6 ">
          <Link href={`/family-user/${data?.name}`}>
            <h4 className="text-xl lg:text-3xl font-medium text-primary-black">
              {data?.name}
            </h4>
          </Link>

          {/* location , experience, booking */}
          <div className="flex flex-col md:flex-row gap-2 justify-between lg:items-center">
            <p className="flex gap-x-2 items-center text-lg text-primary-gray">
              <MapPinHouse color="#F26D6D" size={20} />
              {data?.location}
            </p>
            <Dot color="#141414B2" className="hidden md:block"></Dot>
            <p className="flex  gap-2 items-center text-lg text-primary-gray">
              <Image src={icon1} alt="icon" />
              {data?.children}
            </p>
            <Dot color="#141414B2" className="hidden md:block"></Dot>
            <p className="flex gap-x-2 items-center text-lg text-primary-gray">
              <Image src={icon2} alt="icon" />
              {data?.age} Years old
            </p>
          </div>

          {/* description */}
          <p className="text-lg text-primary-gray">{data?.description}</p>

          {/* action button  */}
          {children && <div>{children}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookRequestCard;
