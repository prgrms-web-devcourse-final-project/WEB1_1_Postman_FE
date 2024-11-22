import { Input } from '../Common/Input/Input';

export const ConfirmPasswordInput = () => {
    return (
        <Input
            autoComplete="off"
            type="password"
            name="confirm_password"
            text="비밀번호 확인"
            required
        />
    );
};
