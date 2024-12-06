import { NavLink } from 'react-router-dom';
import { Logo } from '../../Common/LogoContainer/Logo';
import { IoIosNotifications } from 'react-icons/io';

export const TopButtonContainer = () => {
    return (
        <div className="flex justify-between px-6 py-4">
            <NavLink to={'/'}>
                <Logo h={34} />
            </NavLink>

            <NavLink to={'/notification'} className="size-[34px] relative">
                <IoIosNotifications className="size-[34px] text-[#22B8EF]" />
            </NavLink>
        </div>
    );
};
