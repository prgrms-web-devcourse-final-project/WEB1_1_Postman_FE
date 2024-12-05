import React, { useState } from 'react';
import { useToastStore } from '@/hooks/useToastStore';
import { checkNickname } from '@/service/auth';
import { changeNickname } from '@/service/user';
import { NicknameInput } from '@/components/Common/Input/NicknameInput';
import { useUserStore } from '@/stores';

export const NicknameSection = () => {
    const { addToast } = useToastStore();
    const { user } = useUserStore();
    const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);

    // 닉네임 수정 모드 진입
    const handleEditNickname = () => {
        if (!isNicknameEditing) setIsNicknameEditing(true);
    };

    // 닉네임 유효성 검사 - 중복체크
    const validateNickname = async (nickname: string) => {
        const response = await checkNickname({ nickname });
        return response;
    };

    // 닉네임 업데이트
    const updateNickname = async (nickname: string) => {
        await changeNickname({ nickname });
    };

    // 성공 처리
    const handleNicknameSuccess = () => {
        addToast('닉네임이 변경되었습니다.', 'success');
        setIsNicknameEditing(false);
    };

    // 에러 처리
    const handleNicknameError = (error: any) => {
        if (error.message === '닉네임 중복') {
            addToast('중복된 닉네임입니다.', 'warning');
        }
        console.error('Nickname change error:', error);
    };

    // 닉네임 변경 버튼 클릭
    const handleNicknameChange = async (nickname: string) => {
        try {
            await validateNickname(nickname);
            await updateNickname(nickname);
            handleNicknameSuccess();
        } catch (error) {
            handleNicknameError(error);
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
                    {/* <button type="submit" className="border rounded-sm border-sample-blue">
                        변경
                    </button> */}
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
