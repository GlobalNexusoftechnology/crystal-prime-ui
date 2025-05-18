import Image from "next/image";
import { ReactNode } from "react";

import { ImageRegistry } from "@/constants";
import { Button } from "@/components";
import Link from "next/link";

/**
 * AuthCard Component
 *
 * A reusable layout for authentication pages.
 * Displays a full-screen background image, logo, optional top-right button,
 * and a centered card for form content with a title and footer.
 *
 * Props:
 * - title: The heading displayed above the form.
 * - copyright: Footer text displayed below the form.
 * - children: Form elements or content passed into the card.
 */

interface IAuthCardProps {
  title: string;
  copyright: string;
  children: ReactNode;
}

export const AuthCard: React.FC<IAuthCardProps> = ({
  title,
  copyright,
  children,
}) => {
  return (
    <section className="relative w-full h-auto xl:h-screen px-4 md:px-10 xl:px-[6vw]">
      <div className="absolute inset-0 -z-10 h-full ">
        <Image
          src={ImageRegistry.satkarBackground}
          alt="website-background"
          fill
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute top-[-2vw] left-0 flex justify-between items-center w-full px-4 md:px-10 xl:px-[6vw]">
        <div className="h-36 w-36 2xl:h-[14vw] 2xl:w-[14vw]">
          <Image
            src={ImageRegistry.websiteLogo}
            alt="website-logo"
            className="w-full h-full object-contain"
          />
        </div>
        <Link href="/sign-up" className="cursor-pointer z-50">
          <Button title="Sign up" />
        </Link>
      </div>

      <div className="xl:absolute xl:top-[50%] xl:left-[50%] xl:translate-x-[-50%] xl:translate-y-[-50%] flex flex-col gap-4 2xl:gap-[1vw] justify-center items-center w-full h-full">
        <div className="bg-whiteOverlay box-shadow flex flex-col p-6 2xl:p-[1.5vw] border-b-4 2xl:border-b-[0.4vw] border-b-primary rounded-xl 2xl:rounded-[0.75vw] w-full sm:w-[60%] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]">
          <h1 className="text-2xl md:text-3xl 2xl:text-[1.875vw] font-bold mb-4 2xl:mb-[1vw] text-center">
            {title}
          </h1>
          <div className="min-h-[300px] max-h-[400px] overflow-y-auto scrollbar-hidden">
            {children}
          </div>
        </div>
        <div className="text-sm 2xl:text-[0.875vw] text-white">{copyright}</div>
      </div>
    </section>
  );
};
