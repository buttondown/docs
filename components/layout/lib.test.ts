import { expect, test } from "bun:test";
import dotenv from "dotenv";
import { assembleNavData } from "./lib";

dotenv.config();

test("assembleNavData", async () => {
  expect(
    assembleNavData(
      {
        foo: [
          {
            name: "Folder 1",
            items: [
              {
                discriminant: "page",
                value: "a",
              },
              {
                discriminant: "divider",
                value: "b",
              },
            ],
          },
        ],
        bar: [
          {
            name: "Folder 2",
            items: [],
          },
          {
            name: "Folder 3",
            items: [],
          },
        ],
      },
      [
        {
          slug: "a",
          title: "A",
          navigationTitle: "AA",
        },
      ],
    ),
  ).toStrictEqual({
    foo: [
      {
        name: "Folder 1",
        items: [
          { type: "page", title: "A", navigationTitle: "AA", slug: "a" },
          { type: "divider", title: "b" },
        ],
      },
    ],
    bar: [
      { name: "Folder 2", items: [] },
      { name: "Folder 3", items: [] },
    ],
  });
});
