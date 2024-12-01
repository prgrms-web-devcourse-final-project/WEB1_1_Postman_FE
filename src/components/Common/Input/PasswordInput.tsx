import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type PasswordInputProps = {
    onValueChange?: (value: string) => void;
    required?: boolean;
};

export const PasswordInput = ({
    required = true,
    onValueChange
}: PasswordInputProps) => {
    return (
        <Input
            autoComplete="off"
            text="비밀번호"
            name="password"
            type="password"
            errorMessage={AUTH_INPUT_VALIDATION.password.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.password.regexp}
            required={required}
            togglePassword={true}
            onValueChange={onValueChange}
        />
    );
};
