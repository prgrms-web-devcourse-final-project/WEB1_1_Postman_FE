import type { Meta, StoryObj } from '@storybook/react';

import { PostLetterForm } from './PostLetterForm';

const meta: Meta<typeof PostLetterForm> = {
    component: PostLetterForm,
    title: 'PostLetterForm',
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
                    minHeight: '500px', // 최소 높이 추가
                    display: 'flex',
                    flexDirection: 'column', // Flexbox로 하위 요소 정렬
                    justifyContent: 'center' // 하위 콘텐츠 중앙 정렬
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
