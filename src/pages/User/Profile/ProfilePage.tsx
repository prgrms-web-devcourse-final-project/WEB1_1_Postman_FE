import { IconMenuButton } from '@/components/MyPage/IconMenuButton';
import { useNavigate } from 'react-router-dom';
import { AccountInfoSection } from '@/components/Profile/AccountInfoSection';
import { NicknameSection } from '@/components/Profile/NicknameSection';
import { ProfileImageSection } from '@/components/Profile/ProfileImageSection';
import { useState } from 'react';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [isProfileImageEditing, setisProfileImageEditing] =
        useState<boolean>(false);

    const handleNavigateShare = () => {
        navigate('/profileshare');
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center justify-center gap-5 ">
                <ProfileImageSection
                    isEditing={isProfileImageEditing}
                    onEditingChange={setisProfileImageEditing}
                />
                <NicknameSection />
                <div className="flex flex-row gap-4">
                    <IconMenuButton
                        onClick={() => setisProfileImageEditing(true)}
                        iconUrl="/ic_pen.svg"
                        content="아바타 변경"
                    />
                    <IconMenuButton
                        onClick={handleNavigateShare}
                        iconUrl="/ic_share.svg"
                        content="프로필 공유"
                    />
                </div>
            </div>
            <AccountInfoSection />
        </div>
    );
};
