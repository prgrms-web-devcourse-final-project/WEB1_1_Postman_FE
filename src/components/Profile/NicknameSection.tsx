import React, { useState } from 'react';
import { useToastStore } from '@/hooks/useToastStore';
import { changeNickname } from '@/service/user';
import { NicknameInput } from '@/components/Common/Input/NicknameInput';
import { useUserStore } from '@/stores';
import { useUserInfo } from './../../hooks/useUserInfo';

export const NicknameSection = () => {
    const { addToast } = useToastStore();
    const { user } = useUserStore();
    const { handleGetUserInfo } = useUserInfo();
    const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);

    const handleEditNicknameMode = () => {
        if (!isNicknameEditing) {
            setIsNicknameEditing(true);
            return;
        }
        setIsNicknameEditing(false);
    };

    const handleNicknameChange = async (nickname: string) => {
        try {
            console.log(nickname);
            const response = await changeNickname({ nickname });
            console.log(response);
            if (response.isSuccess) {
                addToast('닉네임을 변경했어요.', 'success');
                handleEditNicknameMode();
                handleGetUserInfo();
            }
        } catch (error) {
            addToast(error, 'warning');
            console.error(error);
        }
    };

    const handleNicknameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const $nicknameForm = e.target as HTMLFormElement;
        const nicknameFormData = new FormData($nicknameForm);
        const [nickname] = [nicknameFormData.get('nickname') as string];
        if (user.nickname === nickname) {
            addToast('동일한 닉네임이에요.', 'warning');
            return;
        }
        handleNicknameChange(nickname);
    };

    const renderNicknameBox = () => {
        if (isNicknameEditing)
            return (
                <form
                    onSubmit={handleNicknameSubmit}
                    className="flex flex-row items-center justify-center gap-3"
                >
                    <NicknameInput
                        defaultValue={user?.nickname}
                        showText={false}
                    />
                </form>
            );
        return (
            <div className="flex flex-row items-center justify-center gap-2 font-semibold">
                {user?.nickname}
                <img
                    onClick={() => handleEditNicknameMode()}
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
