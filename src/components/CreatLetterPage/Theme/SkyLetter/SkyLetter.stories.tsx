import type { Meta, StoryObj } from '@storybook/react';

import { SkyLetter } from './SkyLetter';

const meta: Meta<typeof SkyLetter> = {
    component: SkyLetter,
    title: 'theme/SkyLetter',
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

type Story = StoryObj<typeof SkyLetter>;

export const Default: Story = {
    args: {}
};
