import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { TitleClosedTopBar } from './TitleClosedTopBar';

const meta: Meta<typeof TitleClosedTopBar> = {
    component: TitleClosedTopBar,
    title: 'molecule/TitleClosedTopBar',
    tags: ['autodocs'],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component:
                    '이전 페이지로 이동하는 x버튼과 타이틀이 있는 앱 바 입니다.'
            }
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

type Story = StoryObj<typeof TitleClosedTopBar>;

export const Default: Story = {
    args: {
        title: '제목'
    }
};
