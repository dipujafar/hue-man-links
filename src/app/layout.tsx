import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/shared/Footer";
import NextTopLoader from "nextjs-toploader";
import "react-pagination-bar/dist/index.css";
import { Toaster } from "sonner";
import Providers from "@/lib/providers/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HUE-MAN Link ",
    template: "%s | HUE-MAN Links",
  },
  description:
    "This is official website of  Hue-Man Links. This is a platform for linking families with sitters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./logo.png" />
      </head>

      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <NextTopLoader
            color="#F26D6D"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #232323,0 0 5px #EA5326"
            zIndex={1600}
            showAtBottom={false}
          />
          <Toaster position="top-center" />

          <div className="min-h-[calc(100vh-250px)] ">{children}</div>
          <footer>
            <Footer></Footer>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
