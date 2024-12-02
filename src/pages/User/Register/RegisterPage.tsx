import React from 'react';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { EmailSection } from '@/components/RegisterPage/EmailSection';
import { PasswordSection } from '@/components/RegisterPage/PasswordSection';
import { NicknameSection } from '@/components/RegisterPage/NicknameSection';

export const RegisterPage = () => {
    const {
        formState,
        validationState,
        updateField,
        handleRequestEmailVerifyCode,
        handleVerifyEmail,
        handleCheckNickname,
        handleSubmit
    } = useRegisterForm();

    const handleFormKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className="p-3 flex flex-col gap-3">
            <h2 className="font-bold text-2xl ">회원가입</h2>
            <div>
                <form
                    className="flex flex-col gap-8"
                    onSubmit={handleSubmit}
                    onKeyDown={handleFormKeyDown}
                    noValidate
                >
                    <EmailSection
                        email={formState.email}
                        onEmailChange={(value) => updateField('email', value)}
                        onAuthNumChange={(value) =>
                            updateField('authNum', value)
                        }
                        onRequestVerify={handleRequestEmailVerifyCode}
                        onRequestAuthNumVerify={handleVerifyEmail}
                        isEmailSend={validationState.isEmailSend}
                        isEmailVerified={validationState.isEmailVerified}
                    ></EmailSection>
                    <PasswordSection
                        onPasswordChange={(value) =>
                            updateField('password', value)
                        }
                        onConfirmPasswordChange={(value) =>
                            updateField('confirmPassword', value)
                        }
                    ></PasswordSection>
                    <NicknameSection
                        nickname={formState.nickname}
                        onNicknameChange={(value) =>
                            updateField('nickname', value)
                        }
                        onRequestNicknameVerify={handleCheckNickname}
                        isNicknameChecked={validationState.isNicknameChecked}
                        isNicknameValid={validationState.isNicknameValid}
                    ></NicknameSection>
                    <button type="submit" className="bg-slate-200">
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
};
