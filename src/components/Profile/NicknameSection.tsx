import React, { useState } from 'react';
import { useToastStore } from '@/hooks/useToastStore';
import { checkNickname } from '@/service/auth';
import { changeNickname } from '@/service/user';
import { NicknameInput } from '@/components/Common/Input/NicknameInput';
import { useUserStore } from '@/stores';
import { useUserInfo } from './../../hooks/useUserInfo';

export const NicknameSection = () => {
    const { addToast } = useToastStore();
    const { user } = useUserStore();
    const { handleGetUserInfo } = useUserInfo();
    const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);

    // 닉네임 수정 모드 진입
    const handleEditNickname = () => {
        if (!isNicknameEditing) setIsNicknameEditing(true);
    };

    // 닉네임 변경 버튼 클릭
    const handleNicknameChange = async (nickname: string) => {
        try {
            const response = await changeNickname(nickname);
            if (response.isSuccess) {
                addToast(response.message, 'success');
                handleGetUserInfo();
            }
        } catch (error) {
            addToast(error, 'warning');
            console.error(error);
        }
    };

    // 닉네임 폼 제출
    const handleNicknameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const $nicknameForm = e.target as HTMLFormElement;
        const nicknameFormData = new FormData($nicknameForm);
        const [nickname] = [nicknameFormData.get('nickname') as string];
        handleNicknameChange(nickname);
    };

    const renderNicknameBox = () => {
        if (isNicknameEditing)
            return (
                <form
                    onSubmit={handleNicknameSubmit}
                    className="flex flex-row items-center justify-center gap-3"
                >
                    <NicknameInput defaultValue={user?.nickname} />
                </form>
            );
        return (
            <div className="flex flex-row items-center justify-center gap-2 font-semibold">
                {user?.nickname}
                <img
                    onClick={handleEditNickname}
                    className="w-[15px] h-[15px] p-[2px] bg-sample-gray rounded-sm"
                    src="/ic_pen.svg"
                />
            </div>
        );
    };

    return (
        <div className="flex flex-row gap- items-center justify-center w-full h-[35px]">
            {renderNicknameBox()}
        </div>
    );
};
