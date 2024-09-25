import React from "react";

import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";

import { Button } from "@/mijn-ui/components/Button";
import { cn } from "@/mijn-ui/utils";

/* -------------------------------------------------------------------------- */

const VolumeToggler = () => {
  const [isActivated, setIsActivated] = React.useState(false);

  return (
    <Button
      onClick={() => setIsActivated((prev) => !prev)}
      size={"icon"}
      className={cn(
        "size-9 sm:size-10",
        isActivated ? "text-primary" : "text-muted-text",
      )}
      title="Volume"
      variant={"surface"}
    >
      {isActivated ? <FaVolumeLow /> : <FaVolumeXmark />}
    </Button>
  );
};

export default VolumeToggler;
