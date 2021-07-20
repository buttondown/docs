import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Table from "../components/Table";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  columns: [
    {
      title: "Foo",
      key: "foo",
    },
    {
      title: "Bar",
      key: "bar",
    },
  ],
  content: [{ foo: "1", bar: "2" }],
};
