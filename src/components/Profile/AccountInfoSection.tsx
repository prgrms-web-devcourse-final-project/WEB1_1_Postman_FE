import React from 'react';
import { useUserStore } from '@/stores';

export const AccountInfoSection = () => {
    const { user } = useUserStore();
    return (
        <div className="flex flex-col gap-3">
            <h2 className="font-semibold">계정 정보</h2>
            <div className="flex flex-col gap-1">
                <div>{user?.email}</div>
                <div>비밀번호 변경</div>
            </div>
        </div>
    );
};
