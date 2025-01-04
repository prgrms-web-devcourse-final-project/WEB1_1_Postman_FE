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
        <div className="flex flex-col items-center gap-5 w-full h-full my-[50px] px-5">
            <h2 className="text-2xl text-center text-sample-blue font-bold py-3 ">
                Bottler
            </h2>
            <form
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit}
                onKeyDown={handleFormKeyDown}
                noValidate
            >
                <EmailSection
                    email={formState.email}
                    onEmailChange={(value) => updateField('email', value)}
                    onAuthNumChange={(value) => updateField('authNum', value)}
                    onRequestVerify={handleRequestEmailVerifyCode}
                    onRequestAuthNumVerify={handleVerifyEmail}
                    isVerifyLoading={validationState.isVerifyLoading}
                    isEmailSend={validationState.isEmailSend}
                    isEmailVerified={validationState.isEmailVerified}
                ></EmailSection>
                <PasswordSection
                    onPasswordChange={(value) => updateField('password', value)}
                    onConfirmPasswordChange={(value) =>
                        updateField('confirmPassword', value)
                    }
                ></PasswordSection>
                <NicknameSection
                    nickname={formState.nickname}
                    onNicknameChange={(value) => updateField('nickname', value)}
                    onRequestNicknameVerify={handleCheckNickname}
                    isNicknameChecked={validationState.isNicknameChecked}
                    isNicknameValid={validationState.isNicknameValid}
                ></NicknameSection>
            </form>
            <div className="flex flex-col w-full gap-2">
                <button type="submit" className="btn-primary-filled">
                    가입하기
                </button>
                <div>
                    이미 회원이신가요?
                    <Link to="/login" className="text-bold text-sample-blue">
                        {' '}
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
};
