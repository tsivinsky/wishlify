import { clsx } from "clsx";
import { forwardRef, JSX } from "react";

const sizeClasses = {
  small: "py-1 px-2 text-sm",
  medium: "py-1 px-2 text-base",
};

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  loading?: boolean;
  size?: keyof typeof sizeClasses;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size = "medium", className, children, disabled, loading, ...props },
    ref,
  ) => {
    return (
      <button
        className={clsx(
          "border rounded cursor-pointer focus:outline-2 outline-blue-500 disabled:opacity-50",
          className,
          sizeClasses[size],
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
