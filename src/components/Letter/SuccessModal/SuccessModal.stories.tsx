import type { Meta, StoryObj } from '@storybook/react';

import { SuccessModal } from './SuccessModal';

const meta: Meta<typeof SuccessModal> = {
    component: SuccessModal,
    title: 'atoms/SuccessModal',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof SuccessModal>;

export const Default: Story = {
    args: {}
};
