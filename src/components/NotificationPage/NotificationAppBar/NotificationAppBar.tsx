import { IoCloseOutline } from 'react-icons/io5';

export const NotificationAppBar = () => {
    return (
        <div className="h-[60px] w-full flex items-center justify-between">
            <p className="pl-[20px] text-[24px]">알림함</p>

            <button className="flex-center size-[44px]">
                <IoCloseOutline className="size-[40px]" />
            </button>
        </div>
    );
};
