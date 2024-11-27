import React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationItemProps = {
    icon: React.ReactNode;
    label: string;
    path: string;
};

export const NavigationItem = ({ icon, label, path }: NavigationItemProps) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 ${
                    isActive ? 'text-blue-500' : 'text-gray-400'
                }`
            }
        >
            <div>{icon}</div>
            <span className="text-sm">{label}</span>
        </NavLink>
    );
};
