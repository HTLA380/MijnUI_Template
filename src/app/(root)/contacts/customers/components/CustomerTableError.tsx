import React from "react";

import { cn } from "@/mijn-ui/utils";

type CustomerTableErrorProps = {
  isError: boolean;
  className?: string;
};

const CustomerTableError = ({
  isError,
  className,
}: CustomerTableErrorProps) => {
  if (!isError) return;

  return (
    <p
      className={cn(
        "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-danger-text",
        className,
      )}
    >
      Something went wrong! please try again...
    </p>
  );
};

export default CustomerTableError;