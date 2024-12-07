import React, { useState } from 'react';
import { useUserStore } from '@/stores';
import { PasswordInput } from '../Common/Input/PasswordInput';
import { useToastStore } from '@/hooks/useToastStore';
import { changePassword } from '@/service/user/changePassword';
import { useUserInfo } from '@/hooks/useUserInfo';
import { ApiErrorType } from '@/types/apiError';

type AccountInfoSectionProps = {
    isEditing: boolean;
    onEditingChange: (isEditing: boolean) => void;
};

export const AccountInfoSection = ({
    isEditing,
    onEditingChange
}: AccountInfoSectionProps) => {
    const { addToast } = useToastStore();
    const { user } = useUserStore();
    const { handleGetUserInfo } = useUserInfo();

    const renderConfirmPassword = () => {
        return (
            <form
                onSubmit={handleConfirmPassword}
                className="flex flex-col gap-3"
                noValidate
            >
                <div>
                    <PasswordInput
                        textContent="기존 비밀번호"
                        nameContent={'existingPassword'}
                    />
                    <PasswordInput
                        textContent="새 비밀번호"
                        nameContent={'newPassword'}
                    />
                </div>
                <button type="submit" className="bg-sample-gray p-1">
                    확인
                </button>
            </form>
        );
    };

    const handleConfirmPassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const $PasswordForm = e.target as HTMLFormElement;
        const PasswordFormData = new FormData($PasswordForm);
        const [existingPassword, newPassword] = [
            PasswordFormData.get('existingPassword') as string,
            PasswordFormData.get('newPassword') as string
        ];

        if (!(existingPassword && newPassword)) {
            addToast('모든 정보를 입력해주세요.', 'warning');
            return;
        }

        if (existingPassword === newPassword) {
            addToast('동일한 비밀번호로 변경할 수 없습니다.', 'warning');
            return;
        }

        try {
            const response = await changePassword({
                existingPassword,
                newPassword
            });
            if (response.isSuccess) {
                addToast('비밀번호가 변경되었습니다.', 'success');
                handleGetUserInfo();
                onEditingChange(false);
                return;
            }
            addToast(response.message, 'warning');
        } catch (error) {
            const errorResponse = error as ApiErrorType;
            addToast(errorResponse.message, 'warning');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <h2 className="font-semibold">계정 정보</h2>
            <div className="flex flex-col gap-1">
                <div>{user?.email}</div>
                <div className="text-btn" onClick={() => onEditingChange(true)}>
                    비밀번호 변경하기
                </div>
                {isEditing && renderConfirmPassword()}
            </div>
        </div>
    );
};
