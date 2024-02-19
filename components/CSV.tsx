import { useState } from "react";

import Table from "./Table";

enum Mode {
  RAW = "raw",
  FORMATTED = "formatted",
}
const Modes = [Mode.RAW, Mode.FORMATTED];
const ModeToInfo: { [key in Mode]: { name: string } } = {
  [Mode.RAW]: {
    name: "Raw CSV",
  },
  [Mode.FORMATTED]: {
    name: "Table View",
  },
};

export default function CSV({ data }: { data: { [key: string]: any }[] }) {
  const [active, setActive] = useState(Mode.RAW);

  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) => headers.map((header) => row[header]).join(",")),
  ].join("\n");

  return (
    <div className="bg-gray-100 border border-gray-300">
      <div
        className="grid border-b border-gray-300"
        style={{ gridTemplateColumns: `repeat(${Modes.length}, 1fr)` }}
      >
        {Modes.map((mode) => (
          <button
            key={mode}
            className={
              "font-medium p-2 " +
              (active === mode
                ? "text-white bg-buttondown-blue"
                : "text-gray-500 bg-gray-200")
            }
            onClick={() => setActive(mode)}
          >
            {ModeToInfo[mode].name}
          </button>
        ))}
      </div>

      {active === Mode.RAW && <pre className="p-4">{csv}</pre>}

      {active === Mode.FORMATTED && (
        <Table
          columns={headers.map((header) => ({ title: header }))}
          content={data}
        />
      )}
    </div>
  );
}
