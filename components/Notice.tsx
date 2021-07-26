import { InformationCircleIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
import { Component, ReactNode } from "react";

type Variant = "warning" | "info";

type Props = {
  children: ReactNode;
  variant: Variant;
};

type Configuration = {
  heading: string;
  color: string;
  icon: Component;
};

const NoticeConfiguration = {
  warning: {
    heading: "warning",
    color: "text-red-600",
    backgroundColor: "bg-red-100",
    borderColor: "border-red-600",
    icon: ExclamationIcon,
  },
  info: {
    heading: "info",
    color: "text-green-600",
    backgroundColor: "bg-green-100",
    borderColor: "border-green-600",
    icon: InformationCircleIcon,
  },
};

export default function Notice(props: Props) {
  const configuration = NoticeConfiguration[props.variant];

  return (
    <div
      className={`${configuration.backgroundColor} border-l-4 ${configuration.borderColor} p-4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <configuration.icon
            className={`h-8 w-8 ${configuration.color}`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className={`font-bold ${configuration.color} text-sm uppercase`}>
            {configuration.heading}
          </p>
          <p className={`text-semi-bold text-lg ${configuration.color}`}>
            {props.children}
          </p>
        </div>
      </div>
    </div>
  );
}
