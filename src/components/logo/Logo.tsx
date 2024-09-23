import Image from "next/image";
import Link from "next/link";

import { Button } from "@/mijn-ui/components/Button";
import { cn } from "@/mijn-ui/utils";

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
    className={cn("size-12 p-1.5 hover:bg-transparent", className)}
  >
    <Image src={imgURL} alt={alt} width={50} height={50} className="w-full" />
  </Button>
);

export default Logo;
