import type { Meta, StoryObj } from '@storybook/react';

import { HeartLetter } from './HeartLetter';

const meta: Meta<typeof HeartLetter> = {
    component: HeartLetter,
    title: 'theme/HeartLetter',
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

type Story = StoryObj<typeof HeartLetter>;

export const Default: Story = {
    args: {}
};
