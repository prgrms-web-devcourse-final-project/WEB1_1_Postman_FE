import type { Meta, StoryObj } from '@storybook/react';

import { BottomSheetContent } from './BottomSheetContent';

const meta: Meta<typeof BottomSheetContent> = {
    component: BottomSheetContent,
    title: 'organisms/BottomSheetContent',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof BottomSheetContent>;

export const Default: Story = {
    args: {
        nickname: '홍길동123'
    }
};
