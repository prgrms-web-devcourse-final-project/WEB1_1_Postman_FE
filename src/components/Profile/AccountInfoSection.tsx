import React from 'react';
import { useUserStore } from '@/stores';

export const AccountInfoSection = () => {
    const { user } = useUserStore();
    return (
        <div>
            <h2>계정 정보</h2>
            <div>{user?.email}</div>
            <div>비밀번호 변경</div>
        </div>
    );
};
