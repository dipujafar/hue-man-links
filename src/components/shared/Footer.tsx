import Image from "next/image";
import { Mail } from "lucide-react";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  return (
    <div className="bg-primary-orange lg:py-16 py-8 lg:mt-32 mt-16">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between justify-center md:gap-y-20 gap-y-5 flex-wrap">
          {/* Logo and icons */}
          <div>
            <div className="bg-primary-white w-fit h-fit p-2 rounded mx-auto">
              <Link href={"/"}>
                <Image
                  src={"/logo.png"}
                  alt="logo"
                  width={106}
                  height={61}
                  className="size-auto"
                />
              </Link>
            </div>
            <div className="flex gap-x-5 justify-center mt-4">
              <Link
                href={
                  "https://www.facebook.com/share/14hGW5vKhn/?mibextid=wwXIfr"
                }
                target="_blank"
              >
                <Image
                  src={facebook}
                  alt="facebook"
                  width={30}
                  height={30}
                ></Image>
              </Link>

              <Link
                href={
                  "https://www.instagram.com/huemanlinksinc/?igsh=MWdhc2JzeXVwZ2U4Mg"
                }
                target="_blank"
              >
                <Image
                  src={instagram}
                  alt="facebook"
                  width={30}
                  height={30}
                ></Image>
              </Link>
            </div>
          </div>

          {/*  Information */}

          <div className="w-fit mx-auto">
            <h3 className="text-primary-white text-2xl font-medium lg:mb-8 mb-4 text-center">
              Information
            </h3>
            <ul className="text-primary-white md:space-y-5 flex flex-row md:flex-col gap-x-2 items-center justify-center flex-wrap">
              <li className="hover:underline hover:text-gray-200 underline-offset-4">
                <Link href="/membership-pricing">Pricing</Link>
              </li>
              <li className="hover:underline hover:text-gray-200 underline-offset-4">
                <Link href="/about-us">About Us</Link>
              </li>
              <li className="hover:underline hover:text-gray-200 underline-offset-4">
                <Link href="/connect-us">Contact Us</Link>
              </li>
              <li className="hover:underline hover:text-gray-200 underline-offset-4">
                <Link href="/faqs">FAQs</Link>
              </li>
              <li className="hover:underline hover:text-gray-200 underline-offset-4">
                <Link href="/terms-condition">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/*  Help & Support */}
          <div>
            <h3 className="text-primary-white text-center text-2xl font-medium mb-4">
              Help & Support
            </h3>

            <div className="text-primary-white  flex  items-center flex-wrap gap-x-2 justify-center">
              <Mail className="inline" /> Email :
              <p className="break-words">
                <Link href={"mailto:huemanlinksinc@gmail.com"}>
                  huemanlinksinc@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
