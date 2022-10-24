import { ReactNode } from "react";
import classNames from "../lib/classNames";

// This should match the Pill in `buttondown-app`.
type Props = {
  children: ReactNode;
  variant: "success" | "info" | "error" | "warning";
};

const Pill = (props: Props) => (
  <div
    className={classNames(
      props.variant === "success" ? "bg-green-500 text-white" : "",
      props.variant === "info" ? "bg-blue-500 text-white" : "",
      props.variant === "error" ? "bg-red-500 text-white" : "",
      props.variant === "warning" ? "bg-yellow-500 text-white" : "",
      "inline-flex gap-x-1.5 items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap capitalize"
    )}
  >
    {props.children}
  </div>
);

export default Pill;
