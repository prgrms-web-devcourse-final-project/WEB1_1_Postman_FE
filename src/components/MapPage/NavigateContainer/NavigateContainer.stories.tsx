import type { Meta, StoryObj } from '@storybook/react';

import { NavigateContainer } from './NavigateContainer';

const meta: Meta<typeof NavigateContainer> = {
    component: NavigateContainer,
    title: 'MOLECULE/NavigateContainer',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof NavigateContainer>;

export const Default: Story = {
    args: {
        title: '가을 바람',
        distance: '15km',
        count: 4,
        clickEvent: () => {
            alert('헬로');
        }
    }
};
