import React from 'react';
import { useUserStore } from '@/stores';
import { ProfileImage } from '../Common/ProfileImage/ProfileImage';
import { useToastStore } from '@/hooks/useToastStore';
import { changeProfileImage } from '@/service/user';
import { ProfileImageItemType } from '@/types/profileImage';
import { SliderMenuContainer } from '../Common/SliderMenuContainer/SliderMenuContainer';

// 샘플 데이터
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

    const handleDismiss = () => {
        onEditingChange(false);
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
        <>
            <ProfileImage
                width="100px"
                height="100px"
                imageItem={{
                    id: '프로필_샘플1',
                    name: '이미지',
                    src: '/testimg.jpg'
                }}
            />
            {renderSliderMenuContainer()}
        </>
    );
};
