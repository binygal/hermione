import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react";

type PopupProps = PropsWithChildren & {
  shouldShow: boolean;
  content: string | React.ReactNode;
  onClose?: () => void;
};

export function PopupFunction(props: PopupProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, content, shouldShow } = props;

  return (
    <div
      ref={ref}
      className={`tooltip tooltip-bottom ${shouldShow ? "tooltip-open" : ""}`}
      data-tooltip={typeof content === "string" ? content : ""}
    >
      {children}
      {shouldShow && <div className={`tooltip-content ${shouldShow ? "pointer-events-auto" : ""}`}>{content}</div>}
    </div>
  );
}

export default forwardRef(PopupFunction);
