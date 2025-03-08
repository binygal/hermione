import React from "react";
import { createPortal } from "react-dom";
import { useWaitForElement } from "../../hooks/useWaitForElement";
import { DRAWER_CONTENT_ID } from "./DrawerConstants";

export default function DrawerContent(props: React.PropsWithChildren) {
  const { children } = props;
  const portalTarget = useWaitForElement(DRAWER_CONTENT_ID);
  console.log("dogs portal content", portalTarget, children);

  if (!portalTarget) {
    return null;
  }
  return createPortal(children, portalTarget);
}
