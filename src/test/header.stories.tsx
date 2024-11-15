import type { Meta, StoryObj } from "@storybook/react";

import header from "./header";

const meta: Meta<typeof header> = {
  component: header,
  title: "common/header",
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof header>;

export const Default: Story = {
  args: {},
};
