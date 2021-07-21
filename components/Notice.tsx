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
    color: "red",
    icon: ExclamationIcon,
  },
  info: {
    heading: "info",
    color: "green",
    icon: InformationCircleIcon,
  },
};

export default function Notice(props: Props) {
  const configuration = NoticeConfiguration[props.variant];

  return (
    <div
      className={`bg-${configuration.color}-100 border-l-4 border-${configuration.color}-600 p-4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <configuration.icon
            className={`h-8 w-8 text-${configuration.color}-600`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p
            className={`font-bold text-${configuration.color}-600 text-sm uppercase`}
          >
            {configuration.heading}
          </p>
          <p
            className={`text-semi-bold text-lg text-${configuration.color}-600`}
          >
            {props.children}
          </p>
        </div>
      </div>
    </div>
  );
}
