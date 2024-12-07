import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type PasswordInputProps = {
    onValueChange?: (value: string) => void;
    required?: boolean;
    nameContent?: string;
    textContent?: string;
    showText?: boolean;
};

export const PasswordInput = ({
    required = true,
    onValueChange,
    nameContent = 'password',
    textContent = '비밀번호',
    showText = true
}: PasswordInputProps) => {
    return (
        <Input
            autoComplete="off"
            text={showText ? textContent : ''}
            name={nameContent}
            type="password"
            errorMessage={AUTH_INPUT_VALIDATION.password.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.password.regexp}
            required={required}
            togglePassword={true}
            onValueChange={onValueChange}
        />
    );
};
