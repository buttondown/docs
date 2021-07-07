export default function Table({ columns, content }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column, i) => (
                    <th
                      scope="col"
                      key={i}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.map((eventType, idx) => (
                  <tr
                    key={eventType.name}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {columns.map((column, keyIndex) => (
                      <td
                        className={
                          keyIndex === 0
                            ? "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            : "px-6 py-4 text-sm text-gray-500"
                        }
                        key={keyIndex}
                      >
                        {column.component
                          ? column.component(eventType[column.title])
                          : eventType[column.title]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
