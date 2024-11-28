import type { Meta, StoryObj } from '@storybook/react';
import { DeleteButton } from './DeleteButton';

const meta: Meta<typeof DeleteButton> = {
    component: DeleteButton,
    title: 'atoms/DeleteButton',
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            action: 'clicked',
            description: '버튼 클릭 시 호출되는 함수',
            table: {
                type: { summary: '() => void' }
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof DeleteButton>;

export const Default: Story = {
    args: {
        onClick: () => alert('편지가 삭제 되었습니다!')
    }
};
