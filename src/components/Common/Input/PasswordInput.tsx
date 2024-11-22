import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

type PasswordInputProps = {
    required?: boolean;
};

export const PasswordInput = ({ required = true }: PasswordInputProps) => {
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
        />
    );
};
