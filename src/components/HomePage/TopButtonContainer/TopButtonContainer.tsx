import { NavLink } from 'react-router-dom';
import { Logo } from '../../Common/LogoContainer/Logo';
import { IoIosNotifications } from 'react-icons/io';

export const TopButtonContainer = () => {
    return (
        <div className="flex justify-between">
            <NavLink to={'/'}>
                <Logo h={34} />
            </NavLink>

            <NavLink to={'/notification'} className="size-[34px]">
                <IoIosNotifications className="size-full text-[#22B8EF]" />
            </NavLink>
        </div>
    );
};
