import { Input } from '../Common/Input/Input';

type EmailVerificationInputProps = {
    disabled?: boolean;
};

export const EmailVerificationInput = ({
    disabled = false
}: EmailVerificationInputProps) => {
    return (
        <Input
            autoComplete="off"
            type="text"
            name="verification_code"
            text="인증번호"
            pattern={/^\d{6}$/}
            maxLength={6}
            required
            disabled={disabled}
            errorMessage="올바른 인증번호를 입력해주세요."
        />
    );
};
