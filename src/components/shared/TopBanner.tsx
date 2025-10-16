import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import Container from "./Container";
import Navbar from "./Navbar";
import MovementElement from "@/animation/MovementElement";
import Link from "next/link";
import AnimatedText from "@/animation/AnimatedText";
import { ClientIntakeDialog } from "../dialog/ClientIntakeDialog";
import { SitterDialog } from "../dialog/SitterDialog";

type TProps = {
  image: StaticImageData;
  imageClass?: string;
  title?: string;
  BannerTitle?: string;
  titleClass?: string;
  btn?: string;
  btnClass?: string;
  btn2?: string;
  btn2Class?: string;
  contentClass?: string;
  btnLink?: string;
  btn2Link?: string;
};
const TopBanner = ({
  image,
  imageClass,
  title,
  BannerTitle,
  titleClass,
  btn,
  btn2,
  btn2Class,
  btnClass,
  contentClass,
  btnLink,
  btn2Link,
}: TProps) => {
  return (
    <div className="relative ">
      <Image
        src={image}
        alt="banner-image"
        className={cn(
          "w-full brightness-75 z-0 object-fill backdrop-blur-xl",
          imageClass
        )}
      ></Image>
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      <Container className={cn("z-20 ", contentClass)}>
        {title && (
          <MovementElement y={"40%"} duration={0.5}>
            <h3 className={cn(titleClass)}>{title}</h3>{" "}
          </MovementElement>
        )}
        {BannerTitle && (
          <MovementElement y={"40%"} duration={0.5} delay={0.2}>
            <h3 className={cn(titleClass)}>{BannerTitle}</h3>
          </MovementElement>
        )}
        <div className="md:mt-6 mt-2 flex gap-x-2">
          {btn && (
            <MovementElement y={"40%"} duration={0.5} delay={0.4}>
              <ClientIntakeDialog />
            </MovementElement>
          )}
          {btn2 && (
            <MovementElement y={"40%"} duration={0.5} delay={0.4}>
              <SitterDialog />
            </MovementElement>
          )}
        </div>
      </Container>
      <Navbar className="absolute mx-auto lg:top-10 top-2 w-full "></Navbar>
    </div>
  );
};

export default TopBanner;
