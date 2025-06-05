import clsx from "clsx";
import { forwardRef, JSX, useId } from "react";

export type InputProps = JSX.IntrinsicElements["input"] & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        {label && (
          <label htmlFor={id} className="text-base">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className="border py-1 px-2 rounded w-full focus:outline-2 outline-blue-500"
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
