import { clsx } from "clsx";
import { forwardRef, JSX, useId } from "react";

export type SelectProps = JSX.IntrinsicElements["select"] & {
  label?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, children, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        {label && (
          <label htmlFor={id} className="text-base">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className="border py-1 px-2 rounded w-full h-full focus:outline-2 outline-blue-500"
          {...props}
        >
          {children}
        </select>
      </div>
    );
  },
);

Select.displayName = "Select";
