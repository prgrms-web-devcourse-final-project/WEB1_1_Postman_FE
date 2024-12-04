import { EmailInput } from '../Common/Input/EmailInput';
import { VerifyEmailInput } from '../Common/Input/VerifyEmailInput';

interface EmailSectionProps {
    email: string;
    onEmailChange: (value: string) => void;
    onAuthNumChange: (value: string) => void;
    onRequestVerify: () => void;
    onRequestAuthNumVerify: () => void;
    isEmailSend: boolean;
    isEmailVerified: boolean;
}

export const EmailSection = ({
    email,
    onEmailChange,
    onAuthNumChange,
    onRequestVerify,
    onRequestAuthNumVerify,
    isEmailSend,
    isEmailVerified
}: EmailSectionProps) => {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <div className="flex w-full items-end gap-2">
                    <div className="w-full">
                        {email && isEmailSend && isEmailVerified && (
                            <div className="flex items-center h-6 text-[12px] text-green-500 md:text-base">
                                ✔ 인증이 완료되었습니다.
                            </div>
                        )}
                        <EmailInput onValueChange={onEmailChange} />
                    </div>
                    <button
                        type="button"
                        className="border border-sample-blue h-8 px-3 rounded text-sample-blue hover:bg-blue-500 hover:text-white transition-colors whitespace-nowrap"
                        onClick={onRequestVerify}
                    >
                        인증번호 전송
                    </button>
                </div>
            </div>

            <div>
                {isEmailSend && (
                    <div className="flex w-full items-end gap-2">
                        <div className="w-full">
                            <VerifyEmailInput onValueChange={onAuthNumChange} />
                        </div>
                        <button
                            type="button"
                            className="border border-sample-blue h-8 px-3 rounded text-sample-blue hover:bg-blue-500 hover:text-white transition-colors whitespace-nowrap items-end"
                            onClick={onRequestAuthNumVerify}
                        >
                            확인
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
