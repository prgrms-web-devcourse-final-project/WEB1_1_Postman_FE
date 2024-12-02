import { Meta, StoryObj } from '@storybook/react';
import { ReplyLetterDetailPage } from './ReplyLetterDetailPage';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof ReplyLetterDetailPage> = {
    component: ReplyLetterDetailPage,
    title: 'Pages/ReplyLetterDetailPage',
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof ReplyLetterDetailPage>;

export const Default: Story = {
    args: {},
    decorators: [
        (Story) => {
            return (
                <MemoryRouter initialEntries={['/letter/reply/123']}>
                    <Routes>
                        <Route path="/letter/reply/:id" element={<Story />} />
                    </Routes>
                </MemoryRouter>
            );
        }
    ]
};
