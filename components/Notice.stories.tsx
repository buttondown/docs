import type { Meta, StoryObj } from "@storybook/react";

import Notice from "./Notice";

const meta: Meta<typeof Notice> = {
  component: Notice,
};

export default meta;
type Story = StoryObj<typeof Notice>;

export const Primary: Story = {
  args: {
    type: "info",
    children: "This is an info notice.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    children: "This is a warning notice.",
  },
};
