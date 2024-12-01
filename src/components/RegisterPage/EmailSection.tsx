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
        <>
            <div>
                <div className="flex flex-row gap-2">
                    <h3>이메일</h3>{' '}
                    {email && isEmailSend && isEmailVerified && (
                        <div className="flex items-center h-6 text-[12px] text-green-500 md:text-base">
                            인증이 완료되었습니다.
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 w-full">
                    <EmailInput onValueChange={onEmailChange} />
                    <button
                        type="button"
                        className="border border-blue-500 h-8 px-3 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors whitespace-nowrap"
                        onClick={onRequestVerify}
                    >
                        인증번호 전송
                    </button>
                </div>
            </div>

            <div>
                {isEmailSend && (
                    <>
                        <h3>이메일 인증번호</h3>
                        <div className="flex flex-row align-middle gap-2 w-full">
                            <VerifyEmailInput onValueChange={onAuthNumChange} />
                            <button
                                type="button"
                                className="border border-blue-500 h-8 px-3 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors whitespace-nowrap"
                                onClick={onRequestAuthNumVerify}
                            >
                                확인
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
