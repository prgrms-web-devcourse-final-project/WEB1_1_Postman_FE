import React from 'react';
import { Input } from './Input';

type ConfirmPasswordInputProps = {
    onValueChange?: (value: string) => void;
    required?: boolean;
};

export const ConfirmPasswordInput = ({
    required = true,
    onValueChange
}: ConfirmPasswordInputProps) => {
    return (
        <Input
            autoComplete="off"
            text="비밀번호 확인"
            name="confirmPassword"
            type="password"
            required={required}
            togglePassword={false}
            onValueChange={onValueChange}
        />
    );
};
