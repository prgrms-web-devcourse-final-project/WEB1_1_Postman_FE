import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type VerifyEmailInputProps = {
    defaultValue?: string;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
};

export const VerifyEmailInput = ({
    defaultValue,
    disabled,
    onValueChange
}: VerifyEmailInputProps) => {
    return (
        <Input
            autoComplete="off"
            text="이메일 인증번호"
            name="verifyEmailCode"
            type="verifyEmailCode"
            errorMessage={AUTH_INPUT_VALIDATION.emailVerifyCode.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.emailVerifyCode.regexp}
            required
            togglePassword={false}
            defaultValue={defaultValue}
            disabled={disabled}
            onValueChange={onValueChange}
        />
    );
};
