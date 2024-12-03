import React from 'react';
import { ListItem } from './../Common/ListItem/ListItem';
import { UserType } from '@/types/user';

type ProfileSectionProps = {
    user: UserType;
};

export const ProfileSection = ({ user }: ProfileSectionProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold">내 프로필 설정</h2>
            <ListItem
                image={user.profileImageUrl}
                contents={user.nickname}
                link={'/profile'}
            />
        </div>
    );
};
