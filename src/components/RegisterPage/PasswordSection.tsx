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
                <div className="w-full">
                    <PasswordInput onValueChange={onPasswordChange} />
                </div>
            </div>
            <div>
                <ConfirmPasswordInput onValueChange={onConfirmPasswordChange} />
            </div>
        </>
    );
};
