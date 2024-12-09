import React from 'react';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { EmailSection } from '@/components/RegisterPage/EmailSection';
import { PasswordSection } from '@/components/RegisterPage/PasswordSection';
import { NicknameSection } from '@/components/RegisterPage/NicknameSection';
import { Link } from 'react-router-dom';

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
        <div className="flex flex-col gap-3 h-full my-[50px]">
            <h2 className="font-bold text-2xl ">회원가입</h2>
            <div>
                <form
                    className="flex flex-col gap-5"
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
                        isVerifyLoading={validationState.isVerifyLoading}
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
                    <button type="submit" className="btn-primary-filled">
                        가입하기
                    </button>
                    <Link to="/login">
                        <div className="cursor-pointer">이미 회원이신가요?</div>
                    </Link>
                </form>
            </div>
        </div>
    );
};
