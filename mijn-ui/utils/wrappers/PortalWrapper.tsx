import * as React from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactElement;
};
const PortalWrapper = ({ children }: PortalProps) => {
  // Check if the data-portal-container exists
  const element = document.querySelector("[data-portal-container]");

  // Create the container if it doesn't exist
  if (!element) {
    const div = document.createElement("div");
    div.setAttribute("data-portal-container", "");
    document.body.appendChild(div);
    return createPortal(children, div);
  }

  // Use the existing container
  return createPortal(children, element);
};

export default PortalWrapper;
