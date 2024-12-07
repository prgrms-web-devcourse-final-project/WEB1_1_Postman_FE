import type { Meta, StoryObj } from '@storybook/react';

import { LetterContainer } from './LetterContainer';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof LetterContainer> = {
    component: LetterContainer,
    title: 'molecule/LetterContainer',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'homePage에서 받은 편지를 표시합니다.'
            }
        }
    }
};
export default meta;

type Story = StoryObj<typeof LetterContainer>;

export const Default: Story = {
    args: {
        letters: []
    }
};
