import type { Meta, StoryObj } from '@storybook/react';

import { BottleLetter } from './BottleLetter';

const meta: Meta<typeof BottleLetter> = {
    component: BottleLetter,
    title: 'BottleLetter',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '200px', height: '200px' }}>
                <Story />
            </div>
        )
    ],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof BottleLetter>;

export const Default: Story = {
    args: {
        Letter: {
            letterId: 1,
            createdDate: '날짜',
            font: '글씨체',
            keywords: ['공감', '행복', '후련함'],
            content: '편지 내용',
            paper: '이미지 url',
            label: '라벨_샘플.png'
        }
    }
};
