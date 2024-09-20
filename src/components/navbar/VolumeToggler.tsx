import React from "react";

import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";

import { cn } from "../../utils";
import { Button } from "../_mijn-ui/Button";

const VolumeToggler = () => {
  const [isActivated, setIsActivated] = React.useState(false);

  return (
    <Button
      onClick={() => setIsActivated((prev) => !prev)}
      size={"icon"}
      className={cn(isActivated ? "text-primary" : "text-muted-text")}
      variant={"surface"}
    >
      {isActivated ? <FaVolumeLow /> : <FaVolumeXmark />}
    </Button>
  );
};

export default VolumeToggler;
