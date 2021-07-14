/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from "@heroicons/react/solid";

export default function Example() {
  return (
    <div className="rounded-md bg-green-600 p-4 mb-8 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-8 w-8 text-gray-50"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-100 font-black uppercase">
            Premium feature
          </h3>
          <div className="mt-2 text-lg text-gray-50">
            <p>
              This section only applies to folks who have signed up for
              Buttondown for Professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
