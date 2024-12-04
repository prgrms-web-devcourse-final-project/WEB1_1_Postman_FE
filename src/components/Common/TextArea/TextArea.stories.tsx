import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
    component: TextArea,
    title: 'atoms/TextArea',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
    args: { value: '즐겁다' }
};
