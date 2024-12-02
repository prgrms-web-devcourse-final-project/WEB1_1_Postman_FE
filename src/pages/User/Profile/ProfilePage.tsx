import React, { useState } from 'react';
import { IconMenuButton } from '@/components/MyPage/IconMenuButton';
import { useUserStore } from '@/stores';
import { NicknameInput } from '@/components/Common/Input/NicknameInput';
import { checkNickname } from '@/service/auth';
import { useToastStore } from '@/hooks/useToastStore';
import { useNavigate } from 'react-router-dom';
import { SliderMenuContainer } from '@/components/Common/SliderMenuContainer/SliderMenuContainer';
import { ProfileImage } from '@/components/Common/ProfileImage/ProfileImage';
import { ProfileImageItemType } from '@/types/profileImage';
import { changeNickname, changeProfileImage } from '@/service/user';

const list = [
    {
        id: '프로필_샘플1',
        name: '이미지',
        src: '/testimg.jpg'
    },
    {
        id: '프로필_샘플2',
        name: '이미지',
        src: '/프로필_샘플.png'
    },
    {
        id: '프로필_샘플3',
        name: '이미지',
        src: '/프로필_샘플.png'
    },
    {
        id: '프로필_샘플4',
        name: '이미지',
        src: '/프로필_샘플.png'
    },
    {
        id: '프로필_샘플5',
        name: '이미지',
        src: '/프로필_샘플.png'
    },
    {
        id: '프로필_샘플6',
        name: '이미지',
        src: '/프로필_샘플.png'
    }
];

export const ProfilePage = () => {
    const { user } = useUserStore();
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);
    const [isProfileImageEditing, setisProfileImageEditing] =
        useState<boolean>(false);

    const handleEditProfileImg = () => {
        if (!isProfileImageEditing) setisProfileImageEditing(true);
    };

    const handleEditNickname = () => {
        if (!isNicknameEditing) setIsNicknameEditing(true);
    };

    const validateNickname = async (nickname: string) => {
        const response = await checkNickname({ nickname });
        if (response.status !== 'OK') {
            throw new Error('닉네임 중복 체크 실패');
        }
    };

    const updateNickname = async (nickname: string) => {
        await changeNickname({ nickname });
    };

    const handleNicknameChange = async (nickname: string) => {
        try {
            await validateNickname(nickname);
            await updateNickname(nickname);
            handleNicknameSuccess();
        } catch (error) {
            handleNicknameError(error);
        }
    };

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

    const handleNicknameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const $nicknameForm = e.target as HTMLFormElement;
        const nicknameFormData = new FormData($nicknameForm);
        const [nickname] = [nicknameFormData.get('nickname') as string];
        handleNicknameChange(nickname);
    };

    const handleShare = () => {
        navigate('/profileshare');
    };

    const renderNicknameBox = () => {
        if (isNicknameEditing)
            return (
                <form
                    onSubmit={handleNicknameSubmit}
                    className="flex flex-row items-center justify-center gap-1"
                >
                    <NicknameInput defaultValue={user?.nickname} />
                    <button type="submit">변경</button>
                </form>
            );
        return (
            <div className="flex flex-row items-center justify-center gap-1">
                {user?.nickname}
                <img
                    onClick={handleEditNickname}
                    className="w-[20px] h-[20px]"
                    src="/ic_pen.svg"
                />
            </div>
        );
    };

    const handleDismiss = () => {
        setisProfileImageEditing(false);
    };

    const handleChangeProfileImage = async (
        imageItem: ProfileImageItemType
    ) => {
        try {
            const response = await changeProfileImage({
                changeImg: imageItem.id
            });
            if (response) {
                addToast('프로필 이미지가 변경되었습니다.', 'success');
            }
        } catch (error) {
            addToast('프로필 이미지 변경에 실패하였습니다.', 'warning');
            console.error(error);
        }
        handleDismiss();
    };

    const renderSliderMenuContainer = () => {
        if (isProfileImageEditing) {
            return (
                <SliderMenuContainer
                    open={isProfileImageEditing}
                    onDismiss={handleDismiss}
                    snapPoints={() => [window.innerHeight * 0.6]}
                    useDefaultSnap={true}
                >
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">아바타 변경</h2>
                        <div className="flex flex-row flex-wrap justify-start items-center gap-4 w-full">
                            {list.map((item) => {
                                return (
                                    <ProfileImage
                                        key={item.id}
                                        width="70px"
                                        height="70px"
                                        imageItem={item}
                                        onClick={handleChangeProfileImage}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </SliderMenuContainer>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col gap-10 m-10">
            <div className="flex flex-col items-center justify-center gap-5 ">
                <ProfileImage
                    width="100px"
                    height="100px"
                    imageItem={{
                        id: '프로필_샘플1',
                        name: '이미지',
                        src: '/testimg.jpg'
                    }}
                />
                <div className="flex flex-row gap- items-center justify-center">
                    {renderNicknameBox()}
                </div>
                <div className="flex flex-row gap-2">
                    <IconMenuButton
                        onClick={handleEditProfileImg}
                        iconUrl="/ic_pen.svg"
                        content="아바타 변경"
                    />
                    <IconMenuButton
                        onClick={handleShare}
                        iconUrl="/ic_share.svg"
                        content="프로필 공유"
                    />
                </div>
            </div>
            <div>
                <h2>계정 정보</h2>
                <div>{user?.email}</div>
                <div>비밀번호 변경</div>
            </div>
            {renderSliderMenuContainer()}
        </div>
    );
};
