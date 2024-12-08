import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/hooks/useToastStore';
import {
    sendEmail,
    verifyEmail,
    checkNickname,
    register
} from '@/service/auth';
import { CheckNicknameResponse, VerifyEmailResponse } from '@/types/register';
import { AUTH_INPUT_VALIDATION } from '@/constants/authInputValidation';

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

    // 회원가입 폼 상태
    const [formState, setFormState] = useState<RegisterFormState>({
        email: '',
        authNum: '',
        password: '',
        confirmPassword: '',
        nickname: ''
    });

    // 회원가입 폼 유효성 검사 상태
    const [validationState, setValidationState] = useState<ValidationState>({
        isEmailSend: false,
        isEmailVerified: false,
        isNicknameChecked: false,
        isNicknameValid: false
    });

    // 폼 필드 업데이트
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

    // 이메일 인증번호 전송 요청
    const handleRequestEmailVerifyCode = async () => {
        if (!formState.email) {
            addToast('이메일을 입력해주세요.', 'warning');
            return;
        }
        const response = await sendEmail({ email: formState.email });
        console.log(response);
        switch (response.code) {
            case 'COMMON200':
                addToast('인증번호가 전송되었습니다.', 'success');
                setValidationState((prev) => ({ ...prev, isEmailSend: true }));
                return true;
            case 'USER4000':
                addToast('유효한 이메일 형식이 아닙니다.', 'warning');
                return false;
            default:
                addToast('인증 요청에 실패했습니다.', 'error');
                return false;
        }
    };

    // 이메일 인증번호 검증 결과 처리
    const handleVerifyEmailResponse = (
        response: VerifyEmailResponse
    ): boolean => {
        switch (response.code) {
            case 'COMMON200':
                addToast('이메일이 인증되었습니다.', 'success');
                return true;
            case 'USER4007':
                addToast('유효하지 않은 인증코드입니다.', 'warning');
                return false;
            default:
                addToast('인증 요청에 실패했습니다.', 'error');
                return false;
        }
    };

    // 이메일 인증번호 검증
    const handleVerifyEmail = async () => {
        if (!formState.authNum) {
            addToast('인증번호를 입력해주세요.', 'warning');
            return false;
        }
        try {
            const response = await verifyEmail({
                email: formState.email,
                code: formState.authNum
            });
            const isVerifySuccess = await handleVerifyEmailResponse(response);
            if (isVerifySuccess) {
                setValidationState((prev) => ({
                    ...prev,
                    isEmailVerified: true
                }));
            }
        } catch (error) {
            console.error('에러: ', error);
            addToast('서버 오류입니다. 다시 시도해주세요.', 'error');
        }
    };

    const handleCheckNicknameResponse = (
        response: CheckNicknameResponse
    ): boolean => {
        switch (response.code) {
            case 'COMMON200':
                addToast('사용 가능한 닉네임입니다.', 'success');
                return true;
            case 'USER4002':
                addToast('닉네임이 중복되었습니다.', 'warning');
                return false;
            default:
                addToast('중복 검사에 실패했습니다.', 'error');
                return false;
        }
    };

    const handleValidateNickname = () => {
        if (!formState.nickname) {
            addToast('닉네임을 입력해주세요.', 'warning');
            return false;
        }

        const pattern = AUTH_INPUT_VALIDATION.nickname.regexp;
        if (!pattern.test(formState.nickname)) {
            addToast('올바르지 않은 닉네임입니다.', 'warning');
            return false;
        }
        return true;
    };

    // 닉네임 중복 검사
    const handleCheckNickname = async () => {
        const validation = handleValidateNickname();
        if (!validation) return;
        try {
            const response = await checkNickname({
                nickname: formState.nickname
            });

            const isCheckNicknameSuccess =
                handleCheckNicknameResponse(response);

            if (isCheckNicknameSuccess) {
                setValidationState((prev) => ({
                    ...prev,
                    isNicknameValid: true,
                    isNicknameChecked: true
                }));
            }
        } catch (error) {
            console.error('Nickname check error:', error);
            setValidationState((prev) => ({
                ...prev,
                isNicknameValid: false,
                isNicknameChecked: true
            }));
            addToast('서버 오류가 발생했습니다.', 'error');
        }
    };

    // 회원가입 폼 제출
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

            switch (response.code) {
                case 'COMMON201':
                    addToast('회원가입이 완료되었습니다.', 'success');
                    navigate('/login');
                    return;
                case 'AUTH4000':
                    addToast('이미 가입이 완료된 이메일입니다.', 'warning');
                    return;
                case 'AUTH4001':
                    addToast('올바르지 않은 이메일 형식입니다.', 'warning');
                    return;
                case 'AUTH4002':
                    addToast('올바르지 않은 닉네임 형식입니다.', 'warning');
                    return;
                case 'AUTH4003':
                    addToast('중복된 닉네임입니다.', 'warning');
                    return;
                default:
                    addToast('알 수 없는 오류가 발생했습니다', 'error');
                    return;
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
