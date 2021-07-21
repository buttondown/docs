import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Notice from "../components/Notice";

export default {
  title: "Notice",
  component: Notice,
} as ComponentMeta<typeof Notice>;

const Template: ComponentStory<typeof Notice> = (args) => <Notice {...args} />;

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  children: "Hi!",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  children: "Hi!",
};
