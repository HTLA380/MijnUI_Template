import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils";

import { Button } from "../_mijn-ui/Button";

type LogoProps = {
  imgURL: string;
  alt: string;
  className?: string;
};

const Logo = ({ imgURL, alt, className }: LogoProps) => (
  <Button
    href={"/"}
    variant={"ghost"}
    size={"icon"}
    renderAs={Link}
    className={cn("hover:bg-transparent size-12 p-1.5", className)}
  >
    <Image src={imgURL} alt={alt} width={50} height={50} className="w-full" />
  </Button>
);

export default Logo;
