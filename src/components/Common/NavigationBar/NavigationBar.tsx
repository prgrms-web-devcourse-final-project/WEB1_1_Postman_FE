import React from 'react';
import { NavigationItem } from './NavigationItem';
import { IoMdHome, IoIosSend } from 'react-icons/io';
import { IoMap } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

export const NavigationBar = () => {
    const navItems = [
        { id: 0, icon: <IoMdHome />, label: '홈', path: '/' },
        {
            id: 1,
            icon: <IoIosSend />,
            label: '편지쓰기',
            path: '/letter/create'
        },
        { id: 2, icon: <IoMap />, label: '지도', path: '/mapexplorer' },
        { id: 3, icon: <FaUserCircle />, label: '마이페이지', path: '/mypage' }
    ];

    return (
        <nav className="flex justify-around bg-white border-y p-3 max-w-[473px] fixed min-w-[375px] w-full bottom-0 z-[9999]">
            {navItems.map((item) => (
                <div className="flex justify-center flex-1" key={item.id}>
                    <NavigationItem
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                    />
                </div>
            ))}
        </nav>
    );
};
