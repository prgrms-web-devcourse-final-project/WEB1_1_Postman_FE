import type { Meta, StoryObj } from '@storybook/react';

import { PostLetterForm } from './PostLetterForm';

const meta: Meta<typeof PostLetterForm> = {
    component: PostLetterForm,
    title: 'molecule/PostLetterForm',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <div
                style={{
                    width: '375px',
                    margin: '0 auto',
                    border: '1px solid #ddd',
                    padding: '16px',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof PostLetterForm>;

export const Default: Story = {
    args: {}
};
