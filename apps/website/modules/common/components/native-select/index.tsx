import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";

export type NativeSelectProps = {
  placeholder?: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
} & SelectHTMLAttributes<HTMLSelectElement>;

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, ...props },
    ref,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(false);

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current,
    );

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true);
      } else {
        setIsPlaceholder(false);
      }
    }, [innerRef.current?.value]);

    return (
      <div>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={cn(
            "relative flex w-full items-center rounded-md border border-border bg-white text-base transition-colors hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10",
            className,
            {
              "text-muted-foreground": isPlaceholder,
            },
          )}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="h-12 appearance-none flex-1 border-none bg-transparent px-4 py-2.5 outline-none"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none ">
            <ChevronUpDownIcon className="size-4" />
          </span>
        </div>
      </div>
    );
  },
);

NativeSelect.displayName = "NativeSelect";

export default NativeSelect;
