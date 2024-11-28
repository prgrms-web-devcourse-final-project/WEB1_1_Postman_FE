import { Meta, StoryObj } from '@storybook/react';
import { LetterDetailPage } from './LetterDetailPage';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof LetterDetailPage> = {
    component: LetterDetailPage,
    title: 'Pages/LetterDetailPage',
    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof LetterDetailPage>;

export const MapLetter: Story = {
    args: {},
    decorators: [
        (Story) => {
            return (
                <MemoryRouter initialEntries={['/letter/map/123']}>
                    <Routes>
                        <Route path="/letter/:type/:id" element={<Story />} />
                    </Routes>
                </MemoryRouter>
            );
        }
    ]
};

export const KeywordLetter: Story = {
    args: {},
    decorators: [
        (Story) => {
            return (
                <MemoryRouter initialEntries={['/letter/keyword/456']}>
                    <Routes>
                        <Route path="/letter/:type/:id" element={<Story />} />
                    </Routes>
                </MemoryRouter>
            );
        }
    ]
};
