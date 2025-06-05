import { XIcon } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { ReactNode } from "react";
import ReactDOM from "react-dom";

const sizeClasses = {
  medium: "rounded-lg p-3",
};

export type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  width?: number;
  size?: keyof typeof sizeClasses;
  title?: string;
  onClose: () => void;
};

export const Modal = ({
  isOpen,
  children,
  width = 900,
  size = "medium",
  title,
  onClose,
}: ModalProps) => {
  if (isOpen) {
    return ReactDOM.createPortal(
      <div
        className="fixed inset-0 z-modal bg-neutral-900/70 backdrop-blur-lg grid place-items-center px-4"
        onPointerDown={onClose}
      >
        <div
          style={{ maxWidth: width }}
          className={clsx("w-full bg-white", sizeClasses[size])}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            {title && <h2 className="text-3xl font-semibold">{title}</h2>}
            <button
              className="w-8 aspect-square cursor-pointer"
              onClick={onClose}
            >
              <XIcon size={28} color="var(--color-neutral-900)" />
            </button>
          </div>
          <div className="mt-2">{children}</div>
        </div>
      </div>,
      document.body,
    );
  }

  return null;
};
