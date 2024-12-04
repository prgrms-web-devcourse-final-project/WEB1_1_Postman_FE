import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { TopButtonContainer } from './TopButtonContainer';

const meta: Meta<typeof TopButtonContainer> = {
    component: TopButtonContainer,
    title: 'molecule/TopButtonContainer',
    tags: ['autodocs'],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component:
                    'homePage에서 상단에 위치하는 로고와 알람함 이동 버튼 입니다.'
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

type Story = StoryObj<typeof TopButtonContainer>;

export const Default: Story = {
    args: {}
};
