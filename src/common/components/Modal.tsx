import { RefObject, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type ModalProps = {
  onCloseClicked: () => void;
  children: (close: () => void) => React.ReactNode;
};

export function Modal(props: ModalProps) {
  const { children, onCloseClicked } = props;
  const modalBoxRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalBoxRef as RefObject<HTMLDivElement>, onCloseClicked);

  return (
    <div className="modal-box overflow-visible" ref={modalBoxRef}>
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onCloseClicked}>
          ✕
        </button>
      </form>
      {children(onCloseClicked)}
    </div>
  );
}
