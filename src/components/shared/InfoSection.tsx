import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import Container from "./Container";
import { ReactNode } from "react";
import MovementElement from "@/animation/MovementElement";
import Link from "next/link";

type TProps = {
  image: StaticImageData;
  imageClass?: string;
  children?: ReactNode;
  descriptionClass?: string;
  title?: string;
  titleClass?: string;
  subTitle?: string;
  subTitleClass?: string;
  btn?: string;
  btnClass?: string;
  className?: string;
  contentClass?: string;
  waterMarkImage?: StaticImageData;
  waterMarkClass?: string;
  waterMarkImage2?: StaticImageData;
  waterMarkClass2?: string;
  btnLink?: string;
};

const InfoSection = ({
  image,
  imageClass,
  title,
  titleClass,
  subTitle,
  subTitleClass,
  children,
  descriptionClass,
  btn,
  btnClass,
  className,
  contentClass,
  waterMarkImage,
  waterMarkClass,
  waterMarkImage2,
  waterMarkClass2,
  btnLink,
}: TProps) => {
  return (
    <Container>
      <div
        className={cn(
          "flex flex-col lg:flex-row justify-between items-center gap-x-5 gap-y-16",
          className
        )}
      >
        {/* image and watermark */}
        <div className="relative w-fit">
          <MovementElement duration={1.3}>
            <Image
              src={image}
              alt="banner-image"
              className={cn("z-10 w-full", imageClass)}
            ></Image>
          </MovementElement>

          {waterMarkImage && (
            <Image
              src={waterMarkImage}
              alt="watermark-image"
              className={cn("absolute  !z-[-9999]", waterMarkClass)}
            ></Image>
          )}
          {waterMarkImage2 && (
            <Image
              src={waterMarkImage2}
              alt="watermark-image"
              className={cn("absolute !z-[-9999]", waterMarkClass2)}
            ></Image>
          )}
        </div>
        {/* ______________________ */}

        <div className={cn(contentClass)}>
          {subTitle && (
            <p
              className={cn("text-xl text-primary-violet mb-2", subTitleClass)}
            >
              {subTitle}
            </p>
          )}

          {title && (
            <h1
              className={cn(
                " text-3xl font-semibold text-deep-blue",
                titleClass
              )}
            >
              {title}
            </h1>
          )}
          {children && (
            <div
              className={cn(
                "mt-5 text-lg font-medium text-black/50 ",
                descriptionClass
              )}
            >
              {children}
            </div>
          )}
          {btn && (
            <Link
              href={btnLink ? btnLink : "#"}
              className=" md:mt-8 mt-2 w-fit mx-auto"
            >
              <Button
                className={cn(
                  " bg-primary-orange font-semibold px-8 py-6",
                  btnClass
                )}
              >
                {btn}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Container>
  );
};

export default InfoSection;
