import type { Meta, StoryObj } from "@storybook/react"
import Button from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    onClick: { action: "clicked" },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "md",
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Button {...args} size="sm">
        Small Button
      </Button>
      <Button {...args} size="md">
        Medium Button
      </Button>
      <Button {...args} size="lg">
        Large Button
      </Button>
    </div>
  ),
  args: {
    variant: "primary",
  },
}
