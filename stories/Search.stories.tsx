import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Search from "../components/Search/Search";

export default {
  title: "Search/Interface",
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  searchOpen: true,
};
