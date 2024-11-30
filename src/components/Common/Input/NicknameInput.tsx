import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type NicknameInputProps = {
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NicknameInput = ({
    defaultValue,
    disabled
}: NicknameInputProps) => {
    return (
        <Input
            type="text"
            autoComplete="nickname"
            name="nickname"
            text="닉네임"
            errorMessage={AUTH_INPUT_VALIDATION.nickname.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.nickname.regexp}
            maxLength={15}
            autoFocus
            required
            defaultValue={defaultValue}
            disabled={disabled}
        />
    );
};
