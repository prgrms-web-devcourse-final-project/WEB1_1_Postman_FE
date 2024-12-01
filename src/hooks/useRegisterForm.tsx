import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/hooks/useToastStore';
import {
    sendEmail,
    verifyEmail,
    checkNickname,
    register
} from '@/service/auth';

interface RegisterFormState {
    email: string;
    authNum: string;
    password: string;
    confirmPassword: string;
    nickname: string;
}

interface ValidationState {
    isEmailSend: boolean;
    isEmailVerified: boolean;
    isNicknameChecked: boolean;
    isNicknameValid: boolean;
}

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const [formState, setFormState] = useState<RegisterFormState>({
        email: '',
        authNum: '',
        password: '',
        confirmPassword: '',
        nickname: ''
    });

    const [validationState, setValidationState] = useState<ValidationState>({
        isEmailSend: false,
        isEmailVerified: false,
        isNicknameChecked: false,
        isNicknameValid: false
    });

    const updateField = (field: keyof RegisterFormState, value: string) => {
        console.log('updateField');
        setFormState((prev) => ({ ...prev, [field]: value }));

        switch (field) {
            case 'email':
                if (value) {
                    setValidationState((prev) => ({
                        ...prev,
                        isEmailSend: false,
                        isEmailVerified: false
                    }));
                }
                break;

            case 'nickname':
                if (value) {
                    setValidationState((prev) => ({
                        ...prev,
                        isNicknameChecked: false,
                        isNicknameValid: false
                    }));
                }
                break;
        }
    };

    const handleRequestEmailVerifyCode = async () => {
        if (!formState.email) {
            addToast('이메일을 입력해주세요.', 'warning');
            return;
        }
        try {
            const response = await sendEmail({ email: formState.email });
            if (response.data === 'success') {
                setValidationState((prev) => ({ ...prev, isEmailSend: true }));
                addToast('인증번호가 전송되었습니다.', 'success');
            }
        } catch (error) {
            addToast('인증번호 전송에 실패했습니다.', 'error');
            console.error(error);
        }
    };

    const handleVerifyEmail = async () => {
        if (!formState.authNum) {
            addToast('인증번호를 입력해주세요.', 'warning');
            return;
        }
        try {
            const response = await verifyEmail({
                email: formState.email,
                authNum: formState.authNum
            });

            if (response.code === 200) {
                setValidationState((prev) => ({
                    ...prev,
                    isEmailVerified: true
                }));
                addToast('이메일 인증이 완료되었습니다.', 'success');
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                addToast('잘못된 인증코드입니다.', 'warning');
            } else {
                addToast('이메일 인증에 실패하였습니다.', 'error');
            }
            console.error('Email verification error:', error);
        }
    };

    const handleCheckNickname = async () => {
        if (!formState.nickname) return;

        try {
            const response = await checkNickname({
                nickname: formState.nickname
            });
            setValidationState((prev) => ({
                ...prev,
                isNicknameValid: !response.data.isDuplicated,
                isNicknameChecked: true
            }));
        } catch (error) {
            setValidationState((prev) => ({
                ...prev,
                isNicknameValid: false,
                isNicknameChecked: true
            }));
            console.error('Nickname check error:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isConfirmPasswordValid =
            formState.password === formState.confirmPassword;
        const isTotalValid =
            validationState.isEmailVerified &&
            validationState.isNicknameValid &&
            isConfirmPasswordValid;

        if (!validationState.isEmailVerified) {
            addToast('이메일 인증을 진행해주세요.', 'warning');
            return;
        }
        if (!isConfirmPasswordValid) {
            addToast('비밀번호 확인이 일치하지 않습니다.', 'warning');
            return;
        }
        if (!validationState.isNicknameValid) {
            addToast('닉네임 중복 확인을 진행해주세요.', 'warning');
            return;
        }

        if (isTotalValid) {
            const response = await register({
                email: formState.email,
                password: formState.password,
                nickname: formState.nickname
            });

            console.log(response.code);

            switch (response.code) {
                case 'COMMON201':
                    addToast('회원가입이 완료되었습니다.', 'success');
                    navigate('/login');
                    break;
                case 'AUTH4000':
                    addToast('이미 가입이 완료된 이메일입니다.', 'warning');
                    break;
                case 'AUTH4001':
                    addToast('올바르지 않은 이메일 형식입니다.', 'warning');
                    break;
                case 'AUTH4002':
                    addToast('올바르지 않은 닉네임 형식입니다.', 'warning');
                    break;
                case 'AUTH4003':
                    addToast('중복된 닉네임입니다.', 'warning');
                    break;
                default:
                    addToast('알 수 없는 오류가 발생했습니다', 'error');
            }
        }
    };

    return {
        formState,
        validationState,
        updateField,
        handleRequestEmailVerifyCode,
        handleVerifyEmail,
        handleCheckNickname,
        handleSubmit
    };
};
