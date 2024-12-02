import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type EmailInputProps = {
    defaultValue?: string;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
};

export const EmailInput = ({
    defaultValue,
    disabled,
    onValueChange
}: EmailInputProps) => {
    return (
        <Input
            type="email"
            autoComplete="email"
            name="email"
            text="이메일"
            errorMessage={AUTH_INPUT_VALIDATION.email.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.email.regexp}
            maxLength={50}
            autoFocus
            required
            defaultValue={defaultValue}
            disabled={disabled}
            onValueChange={onValueChange}
        />
    );
};
