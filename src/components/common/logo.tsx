import Image from "next/image";
import Link from "next/link";

import { buttonStyles } from "@mijn-ui/components/button";
import { cn } from "@mijn-ui/utils";

type LogoProps = {
  imgURL: string;
  alt: string;
  className?: string;
};

const Logo = ({ imgURL, alt, className }: LogoProps) => (
  <Link
    href={"/"}
    className={cn(
      buttonStyles({ variant: "text", color: "accent", size: "icon" }),
      "size-12 p-1.5 hover:bg-transparent",
      className,
    )}
  >
    <Image src={imgURL} alt={alt} width={50} height={50} className="w-full" />
  </Link>
);

export default Logo;
