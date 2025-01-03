import type { Meta, StoryObj } from '@storybook/react';

import { FlowerLetter } from './FlowerLetter';

const meta: Meta<typeof FlowerLetter> = {
    component: FlowerLetter,
    title: 'theme/FlowerLetter',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => {
            return (
                <div className="w-[450px] h-[600px]">
                    <Story />
                </div>
            );
        }
    ]
};
export default meta;

type Story = StoryObj<typeof FlowerLetter>;

export const Default: Story = {
    args: {}
};
