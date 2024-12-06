import React from 'react';
import { useUserStore } from '@/stores';
import { ProfileImage } from '../Common/ProfileImage/ProfileImage';
import { useToastStore } from '@/hooks/useToastStore';
import { changeProfileImage } from '@/service/user';
import { ProfileImageItemType } from '@/types/profileImage';
import { SliderMenuContainer } from '../Common/SliderMenuContainer/SliderMenuContainer';
import { useUserInfo } from './../../hooks/useUserInfo';

// 샘플 데이터
export const PROFILE_IMAGES = [
    {
        id: 1,
        url: 'https://img.bottler.store/profile1.svg',
        alt: 'Profile 1'
    },
    {
        id: 2,
        url: 'https://img.bottler.store/profile2.svg',
        alt: 'Profile 2'
    },
    {
        id: 3,
        url: 'https://img.bottler.store/profile3.svg',
        alt: 'Profile 3'
    },
    {
        id: 4,
        url: 'https://img.bottler.store/profile4.svg',
        alt: 'Profile 4'
    }
    // ...
];

type ProfileImageSectionProps = {
    isEditing: boolean;
    onEditingChange: (isEditing: boolean) => void;
};

export const ProfileImageSection = ({
    isEditing,
    onEditingChange
}: ProfileImageSectionProps) => {
    const { user } = useUserStore();
    const { addToast } = useToastStore();
    const { handleGetUserInfo } = useUserInfo();

    const handleDismiss = () => {
        onEditingChange(false);
    };

    const handleChangeProfileImage = async (
        imageItem: ProfileImageItemType
    ) => {
        try {
            const response = await changeProfileImage(imageItem.url);
            if (response) {
                addToast('프로필 이미지가 변경되었습니다.', 'success');
                console.log('이미지:', user.profileImageUrl);
                handleGetUserInfo();
                handleDismiss();
            }
        } catch (error) {
            addToast('프로필 이미지 변경에 실패하였습니다.', 'warning');
            console.error(error);
        }
        handleDismiss();
    };

    const renderSliderMenuContainer = () => {
        if (isEditing) {
            return (
                <SliderMenuContainer
                    open={isEditing}
                    onDismiss={() => onEditingChange(false)}
                    snapPoints={() => [window.innerHeight * 0.6]}
                    useDefaultSnap={true}
                >
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">아바타 변경</h2>
                        <div className="flex flex-row flex-wrap justify-start items-center gap-4 w-full">
                            {PROFILE_IMAGES.map((item) => {
                                return (
                                    <ProfileImage
                                        key={item.id}
                                        width="70px"
                                        height="70px"
                                        imageItem={item}
                                        onClick={() =>
                                            handleChangeProfileImage(item)
                                        }
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
        <>
            <ProfileImage
                width="100px"
                height="100px"
                imageItem={{
                    url: user.profileImageUrl
                }}
            />
            {renderSliderMenuContainer()}
        </>
    );
};
