import React from 'react';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type EmailVerifyInputProps = {
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EmailVerifyInput = ({
    defaultValue,
    disabled
}: EmailVerifyInputProps) => {
    return (
        <Input
            autoComplete="off"
            text="이메일 인증번호"
            name="emailVerifyCode"
            type="emailVerifyCode"
            errorMessage={AUTH_INPUT_VALIDATION.emailVerifyCode.errorMessage}
            pattern={AUTH_INPUT_VALIDATION.emailVerifyCode.regexp}
            required
            togglePassword={false}
            defaultValue={defaultValue}
            disabled={disabled}
        />
    );
};
