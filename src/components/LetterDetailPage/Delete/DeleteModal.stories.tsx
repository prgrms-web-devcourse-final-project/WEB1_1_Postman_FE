import type { Meta, StoryObj } from '@storybook/react';
import { DeleteModal } from './DeleteModal';

const meta: Meta<typeof DeleteModal> = {
    component: DeleteModal,
    title: 'molecule/DeleteModal',
    tags: ['autodocs'],
    argTypes: {
        id: {
            control: 'text',
            description: '삭제할 편지 ID.',
            defaultValue: '1234'
        },
        closeModal: {
            action: 'closeModal',
            description: '모달 닫기 이벤트 핸들러'
        }
    }
};
export default meta;

type Story = StoryObj<typeof DeleteModal>;

export const Default: Story = {
    args: {
        id: '1234'
    }
};
