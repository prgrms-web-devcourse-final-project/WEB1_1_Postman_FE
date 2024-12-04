import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
    component: SearchInput,
    title: 'Atoms/SearchInput',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
    args: {
        placeholder: '원하는 키워드로 편지를 필터링 해보세요!'
    }
};
