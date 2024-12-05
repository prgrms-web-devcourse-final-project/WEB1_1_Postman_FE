import type { Meta, StoryObj } from '@storybook/react';
import { ReportModal } from './ReportModal';

const meta: Meta<typeof ReportModal> = {
    component: ReportModal,
    title: 'molecule/ReportModal',
    tags: ['autodocs']
};
export default meta;

type Story = StoryObj<typeof ReportModal>;

export const Default: Story = {
    args: {}
};

export const WithCustomReason: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: '기타 옵션 선택 시, 텍스트 입력 필드가 활성화'
            }
        }
    },
    render: (args) => {
        return <ReportModal {...args} />;
    }
};
