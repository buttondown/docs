/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from "@heroicons/react/solid";

export default function Example() {
  return (
    <div className="rounded-md bg-yellow-50 p-4 mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Access restricted
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              This endpoint is currently in closed beta! If you are interested
              in using it, <a href="#">email me</a>
              &nbsp;and I will get you situated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
