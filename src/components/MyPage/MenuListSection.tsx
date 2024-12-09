import React from 'react';
import { MenuListItem } from '../Common/MenuListItem/MenuListItem';
import { useNavigate } from 'react-router-dom';

type MenuListItemType = {
    content: string;
    url: string;
    state?: {
        initialType: string;
    };
};

type MenuListSectionProps = {
    title: string;
    menuItems: MenuListItemType[];
};

export const MenuListSection = ({ title, menuItems }: MenuListSectionProps) => {
    const navigate = useNavigate();
    const handleClick = (item: MenuListItemType) => {
        navigate(item.url, { state: item.state });
    };

    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-bold text-sample-black">{title}</h2>
            <div className="w-full">
                {menuItems.map((item, index) => {
                    return (
                        <div key={item.content + index}>
                            <MenuListItem
                                content={item.content}
                                navigationUrl={item.url}
                                onClick={() => handleClick(item)}
                            />
                            {index < menuItems.length - 1 && (
                                <div className="w-full h-[1px] bg-gray-200" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
