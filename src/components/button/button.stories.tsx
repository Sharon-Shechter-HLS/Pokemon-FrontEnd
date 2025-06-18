import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button"; // Adjust the import path if needed

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Click Me",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Cancel",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Mode",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Learn More",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Can't Click Me",
  },
};
