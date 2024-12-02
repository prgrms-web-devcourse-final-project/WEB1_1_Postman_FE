import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
    component: ListItem,
    title: 'molecule/ListItem',
    tags: ['autodocs'],
    argTypes: {
        image: {
            description: '들어가는 이미지'
        },
        contents: {
            description: '텍스트 콘텐츠'
        },
        link: {
            description:
                '클릭 시 이동하는 경로, 지금은 div로 console만 찍히도록 했습니다.'
        }
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
    args: {}
};

export const Default2: Story = {
    args: {
        contents: '꿈을 꾸는 가오리'
    }
};
