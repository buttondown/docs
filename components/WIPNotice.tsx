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
            Under construction
          </h3>
          <div className="mt-2 text-lg text-gray-50">
            <p>
              This documentation page still needs some TLC.
              If you are looking for something that is not here,&nbsp;
              <a href="mailto:justin@buttondown.email">email me</a>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
