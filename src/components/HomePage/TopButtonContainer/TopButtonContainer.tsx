import { NavLink } from 'react-router-dom';
import { Logo } from '../../Common/LogoContainer/Logo';
import { IoIosNotifications } from '@react-icons/all-files/io/IoIosNotifications';

export const TopButtonContainer = () => {
    return (
        <div className="flex justify-between pb-8">
            <NavLink to={'/'} className="flex-center">
                <Logo h={24} />
            </NavLink>

            <NavLink to={'/notification'} className="size-[34px] relative">
                <IoIosNotifications className="size-[34px] text-sample-blue" />
            </NavLink>
        </div>
    );
};
