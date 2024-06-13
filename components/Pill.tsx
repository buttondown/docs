import clsx from "clsx";
import type { ReactNode } from "react";

// This should match the Pill in `buttondown-app`.

export type Variant = "success" | "info" | "error" | "warning";
type Props = {
  children: ReactNode;
  variant: Variant;
};

const Pill = (props: Props) => (
  <div
    className={clsx(
      props.variant === "success" ? "bg-green-500 text-white" : "",
      props.variant === "info" ? "bg-blue-500 text-white" : "",
      props.variant === "error" ? "bg-red-500 text-white" : "",
      props.variant === "warning" ? "bg-yellow-500 text-white" : "",
      "inline-flex gap-x-1.5 items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap capitalize",
    )}
  >
    {props.children}
  </div>
);

export default Pill;
