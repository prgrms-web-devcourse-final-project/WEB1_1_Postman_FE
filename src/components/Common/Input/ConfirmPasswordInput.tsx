import { Input } from './Input';

export const ConfirmPasswordInput = () => {
    return (
        <Input
            autoComplete="off"
            text="비밀번호 확인"
            name="confirmPassword"
            type="password"
            required
            togglePassword={true}
        />
    );
};
