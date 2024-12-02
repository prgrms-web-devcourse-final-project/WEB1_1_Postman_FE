import React from 'react';
import { NicknameInput } from '../Common/Input/NicknameInput';

interface NicknameSectionProps {
    nickname?: string;
    onNicknameChange?: (value: string) => void;
    onRequestNicknameVerify?: () => void;
    isNicknameChecked?: boolean;
    isNicknameValid?: boolean;
}

export const NicknameSection = ({
    nickname,
    onNicknameChange,
    onRequestNicknameVerify,
    isNicknameChecked,
    isNicknameValid
}: NicknameSectionProps) => {
    const handleNicknameKeyDown = (e: React.KeyboardEvent) => {
        if (onRequestNicknameVerify && e.key === 'Enter') {
            e.preventDefault();
            onRequestNicknameVerify();
        }
    };

    return (
        <div>
            <div className="flex flex-row gap-2">
                {nickname &&
                    isNicknameChecked &&
                    (isNicknameValid ? (
                        <div className="flex items-center h-6 text-[12px] text-green-500 md:text-base">
                            사용 가능한 닉네임입니다.
                        </div>
                    ) : (
                        <div className="flex items-center h-6 text-[12px] text-red-500 md:text-base">
                            이미 사용 중인 닉네임입니다.
                        </div>
                    ))}
            </div>

            <div className="flex flex-row align-middle gap-2 w-full">
                <NicknameInput
                    onValueChange={onNicknameChange}
                    onKeyDown={handleNicknameKeyDown}
                />
                <button
                    type="button"
                    className="border border-blue-500 h-8 px-3 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-colors whitespace-nowrap"
                    onClick={onRequestNicknameVerify}
                >
                    중복 확인
                </button>
            </div>
        </div>
    );
};
