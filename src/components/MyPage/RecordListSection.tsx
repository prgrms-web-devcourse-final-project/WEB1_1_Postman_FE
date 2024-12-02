import React from 'react';
import { MenuListItem } from '../Common/MenuListItem/MenuListItem';

export const RecordListSection = () => {
    const menuList = [
        ['키워드 편지', '/mypage/letter/keword'],
        ['지도 편지', '/mypage/letter/map'],
        ['보관함', '/mypage/letter/bookmark']
    ];

    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold text-gray-400">내 기록</h2>
            <div className="w-full max-w-sm">
                {menuList.map((item) => {
                    return (
                        <MenuListItem
                            key={item[0]}
                            content={item[0]}
                            navigationUrl={item[1]}
                        />
                    );
                })}
            </div>
        </div>
    );
};
