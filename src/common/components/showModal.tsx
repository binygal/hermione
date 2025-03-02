import { createRoot } from "react-dom/client";
import { Modal } from "./Modal";

type ModalProps = {
  children: (onCloseRequest: () => void) => React.ReactNode;
};

export function showModal(props: ModalProps) {
  const { children } = props;
  const modal = document.getElementById("modal");
  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
    const root = createRoot(modal);
    root.render(
      <Modal
        onCloseClicked={() => {
          root.unmount();
          modal.close();
        }}
      >
        {children}
      </Modal>
    );
  }
}
