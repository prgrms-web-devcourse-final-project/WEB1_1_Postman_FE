import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';
import { Input } from './Input';

export const NicknameInput = ({
    defaultValue,
    disabled
}: {
    defaultValue?: string;
    disabled?: boolean;
}) => {
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
