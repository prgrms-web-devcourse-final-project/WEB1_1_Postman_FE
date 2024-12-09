import { useEffect } from 'react';
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
    isVerifyLoading: boolean;
}

export const EmailSection = ({
    email,
    onEmailChange,
    onAuthNumChange,
    onRequestVerify,
    onRequestAuthNumVerify,
    isEmailSend,
    isEmailVerified,
    isVerifyLoading
}: EmailSectionProps) => {
    useEffect(() => {
        console.log(isVerifyLoading);
    }, [isVerifyLoading]);
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
                        className="flex flex-row justify-center items-center gap-2 border border-sample-blue h-8 px-3 w-[200px] rounded text-sample-blue hover:bg-sample-blue hover:text-white transition-colors whitespace-nowrap"
                        onClick={onRequestVerify}
                    >
                        {isVerifyLoading ? (
                            <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        ) : isEmailVerified ? (
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        )}
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
                            className="border border-sample-blue h-8 px-3 rounded text-sample-blue hover:bg-sample-blue hover:text-white transition-colors whitespace-nowrap items-end"
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
