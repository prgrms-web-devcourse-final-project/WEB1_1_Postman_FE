import { ConfirmPasswordInput } from '../Common/Input/ConfirmPasswordInput';
import { PasswordInput } from '../Common/Input/PasswordInput';

interface PasswordSectionProps {
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
}

export const PasswordSection = ({
    onPasswordChange,
    onConfirmPasswordChange
}: PasswordSectionProps) => {
    return (
        <>
            <div>
                <h3>비밀번호</h3>
                <div className="flex flex-row align-middle gap-2 w-full">
                    <PasswordInput onValueChange={onPasswordChange} />
                </div>
            </div>
            <div>
                <h3>비밀번호 확인</h3>
                <ConfirmPasswordInput onValueChange={onConfirmPasswordChange} />
            </div>
        </>
    );
};
