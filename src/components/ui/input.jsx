import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef(({ className, type, id, name, placeholder, ...props }, ref) => {
  // Ensure the input has a name attribute to improve autofill behavior and avoid console warnings
  let inputName = name ?? id;
  if (!inputName) {
    if (placeholder) {
      // derive a safe name from the placeholder
      inputName = placeholder.toString().toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40);
    } else {
      // fallback to a short random name
      inputName = `input_${Math.random().toString(36).slice(2, 8)}`;
    }
  }

  return (
    <input
      ref={ref}
      id={id}
      name={inputName}
      type={type}
      placeholder={placeholder}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
