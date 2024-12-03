import { IoCloseOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

export const NotificationAppBar = () => {
    return (
        <div className="w-full flex items-center justify-between">
            <h1 className="text-[20px] font-semibold text-[#5C5C5C]">알림함</h1>

            <NavLink to={'/'}>
                <IoCloseOutline className="size-[34px] text-[#5C5C5C]" />
            </NavLink>
        </div>
    );
};
