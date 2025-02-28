import { ForwardedRef, forwardRef, PropsWithChildren } from "react";

type PopupProps = PropsWithChildren & {
  title: string;
  shouldShow: boolean;
};

const popupClassNames =
  "absolute p-4 border border-gray-300 shadow-lg popup bottom--50px left-0 bg-(--background-color)";

export function PopupFunction(props: PopupProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, shouldShow } = props;
  const shouldShowClass = shouldShow ? "block" : "hidden";

  return (
    <div ref={ref} className={`${popupClassNames} ${shouldShowClass}`}>
      {children}
    </div>
  );
}

export default forwardRef(PopupFunction);
