import React, { useState } from 'react';
import { NavigationItem } from './NavigationItem';

import { IoMdHome, IoIosSend } from 'react-icons/io';
import { IoMap } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

export const NavigationBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const navItems = [
        { id: 0, icon: <IoMdHome />, label: '홈' },
        { id: 1, icon: <IoIosSend />, label: '편지쓰기' },
        { id: 2, icon: <IoMap />, label: '지도' },
        { id: 3, icon: <FaUserCircle />, label: '마이페이지' }
    ];

    return (
        <nav className="flex justify-around bg-white border-t p-3 fixed bottom-0 w-full">
            {navItems.map((item) => (
                <div className="flex-1 flex justify-center" key={item.id}>
                    <NavigationItem
                        icon={item.icon}
                        label={item.label}
                        isActive={activeIndex === item.id}
                        onClick={() => setActiveIndex(item.id)}
                    />
                </div>
            ))}
        </nav>
    );
};
