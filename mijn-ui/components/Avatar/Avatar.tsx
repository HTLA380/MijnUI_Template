import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

export const avatarStyles = cva(
  [
    "relative flex items-center justify-center shrink-0 overflow-hidden ring-ring bg-muted rounded-full ring-1",
  ],
  {
    variants: {
      size: {
        xxl: "h-16 w-16 text-base",
        xl: "h-14 w-14 text-sm",
        lg: "h-12 w-12 text-sm",
        md: "h-10 w-10 text-sm",
        sm: "h-8 w-8 text-xs",
        xs: "h-6 w-6 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarProps = React.ComponentProps<"img"> &
  VariantProps<typeof avatarStyles> & {
    name?: string;
    src: string;
    alt?: string;
  };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ size, name, src, alt, className, ...props }, ref) => {
    const [isImageLoading, setIsImageLoading] = React.useState<boolean>(true);
    const [hasError, setHasError] = React.useState<boolean>(false);

    const handleImageLoad = () => {
      setIsImageLoading(false);
    };

    const handleImageError = () => {
      setIsImageLoading(false);
      setHasError(true);
    };

    return (
      <div ref={ref} className={cn(avatarStyles({ size, className }))}>
        {src && !hasError ? (
          <img
            alt={alt || "avatar"}
            src={src}
            className={cn("h-full w-full object-cover", {
              hidden: isImageLoading,
            })}
            onLoad={handleImageLoad}
            onError={handleImageError}
            {...props}
          />
        ) : (
          <span>{name?.substring(0, 1)}</span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
