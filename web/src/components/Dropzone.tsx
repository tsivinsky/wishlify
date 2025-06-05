import { clsx } from "clsx";
import Image from "next/image";
import { ComponentRef, useRef, useState } from "react";

export type DropzoneProps = {
  label: string;
  image: string | null;
  accept?: string;
  multiple?: boolean;
  className?: string;
  filterFiles?: (file: File) => boolean;
  onChange: (files: File[]) => void;
};

export const Dropzone = ({
  label,
  image,
  accept,
  multiple = false,
  className,
  filterFiles,
  onChange,
}: DropzoneProps) => {
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<ComponentRef<"input">>(null);

  return (
    <button
      type="button"
      onDragOver={(e) => {
        e.preventDefault();
        setIsActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsActive(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        if (filterFiles) {
          onChange(
            Array.from(e.dataTransfer.files).filter((file) =>
              filterFiles(file),
            ),
          );
        } else {
          onChange(Array.from(e.dataTransfer.files));
        }
      }}
      className={clsx(
        "border-2 border-dashed border-neutral-900 grid place-items-center cursor-pointer relative",
        className,
        {
          "!border-blue-500": isActive,
        },
      )}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        hidden
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => {
          if (e.target.files) {
            onChange(Array.from(e.target.files));
          }
        }}
      />
      {image ? (
        <Image src={image} alt="" fill className="object-contain" />
      ) : (
        <span className="text-center text-xl">{label}</span>
      )}
    </button>
  );
};
