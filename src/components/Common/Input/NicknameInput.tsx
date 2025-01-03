import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type NicknameInputProps = {
    defaultValue?: string;
    disabled?: boolean;
    showText?: boolean;
    onValueChange?: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
};

export const NicknameInput = ({
    defaultValue,
    disabled,
    showText = true,
    onValueChange,
    onKeyDown
}: NicknameInputProps) => {
    return (
        <Input
            type="text"
            autoComplete="nickname"
            name="nickname"
            text={showText ? '닉네임' : ''}
            errorMessage={AUTH_INPUT_VALIDATION.nickname.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.nickname.regexp}
            maxLength={15}
            autoFocus
            required
            defaultValue={defaultValue}
            disabled={disabled}
            onValueChange={onValueChange}
            onKeyDown={onKeyDown}
        />
    );
};
