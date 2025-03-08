import { useMemo, useState } from "react";

export function useWaitForElement(elementId: string) {
  const [element, setElement] = useState<HTMLElement | null>(document.getElementById(elementId));
  useMemo(() => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList") {
          const element = document.getElementById(elementId);
          if (element) {
            setElement(element);
            observer.disconnect();
          }
        }
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return observer;
  }, [elementId, setElement]);
  return element;
}
