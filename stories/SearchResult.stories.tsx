import { Menu } from "@headlessui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import SearchResult from "../components/Search/SearchResult";

export default {
  title: "Search/SearchResult",
  component: SearchResult,
} as ComponentMeta<typeof SearchResult>;

const Template: ComponentStory<typeof SearchResult> = (args) => (
  <Menu>
    <SearchResult {...args} />
  </Menu>
);

export const Basic = Template.bind({});
Basic.args = {
  result: {
    ref: "/advanced-features/metadata",
    score: 5.025,
    matchData: {
      combine: () => {},
      metadata: {
        metadata: {
          text: {
            position: [
              [114, 8],
              [584, 8],
              [702, 8],
              [900, 8],
              [1015, 8],
              [1290, 8],
            ],
          },
          title: { position: [[0, 8]] },
        },
      },
    },
  },
};
