import { InformationCircleIcon } from "@heroicons/react/outline";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export default function Warning(props: Props) {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">{props.children}</p>
        </div>
      </div>
    </div>
  );
}
