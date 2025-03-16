"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useWaitForElement } from "../../hooks/useWaitForElement";
import { DRAWER_CONTENT_ID } from "./DrawerConstants";
import DrawerProvider from "./DrawerProvider";

export default function DrawerContent(props: React.PropsWithChildren) {
  const { children } = props;
  const portalTarget = useWaitForElement(DRAWER_CONTENT_ID);

  if (!portalTarget) {
    return null;
  }
  return createPortal(<DrawerProvider>{children}</DrawerProvider>, portalTarget);
}
