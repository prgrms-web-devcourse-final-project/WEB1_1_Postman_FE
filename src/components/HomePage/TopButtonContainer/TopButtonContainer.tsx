import { NavLink } from 'react-router-dom';
import { Logo } from '../../Common/LogoContainer/Logo';
import { IoIosNotifications } from '@react-icons/all-files/io/IoIosNotifications';
import { NotificationBadge } from '@/components/Common/NotificationBadge/NotificationBadge';
import { useGetUnreadNotifications } from '@/hooks/useGetUnreadNotifications';

export const TopButtonContainer = () => {
    const { data, isLoading, isError } = useGetUnreadNotifications();

    let unreadNotifications;

    if (isLoading || isError || !data) {
        unreadNotifications = 0;
    } else {
        unreadNotifications = data?.result.count;
    }

    return (
        <div className="flex justify-between pb-8">
            <NavLink to={'/'} className="flex-center">
                <Logo h={24} />
            </NavLink>

            <NavLink to={'/notification'} className="size-[34px] relative">
                <IoIosNotifications className="size-[34px] text-sample-blue" />

                <div className="absolute top-0 right-0">
                    <NotificationBadge count={unreadNotifications} />
                </div>
            </NavLink>
        </div>
    );
};
