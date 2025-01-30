import React from 'react';
import { IoMdClose } from '@react-icons/all-files/io/IoMdClose';
import { IoIosWarning } from '@react-icons/all-files/io/IoIosWarning';
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { MdError } from '@react-icons/all-files/md/MdError';

interface ToastProps {
    children: React.ReactNode;
    variant: 'success' | 'warning' | 'error';
    onClose: () => void;
}

const iconStyles = 'w-5 h-5 md:w-6 md:h-6';
const closeStyles = 'w-5 h-5 md:w-6 md:h-6';

const iconComponents = {
    success: <FaCheck className={iconStyles} />,
    warning: <IoIosWarning className={iconStyles} />,
    error: <MdError className={iconStyles} />
};

const Toast = ({ children, variant = 'success', onClose }: ToastProps) => {
    const Icon = iconComponents[variant];

    return (
        <div
            className={`
            relative flex items-center
            w-[90%] md:w-[450px]
            h-[60px] md:h-[77px]
            mb-2 px-6 md:px-8
            rounded-lg text-white
            font-sans font-normal
            text-sm md:text-[22px]
            leading-[16px] md:leading-[26px]
            shadow-md 
            ${
                variant === 'success'
                    ? 'bg-green-500'
                    : variant === 'warning'
                      ? 'bg-red-500'
                      : 'bg-yellow-400'
            }
            animate-toast-slide-in
        `}
        >
            <div className="flex items-center w-full gap-3">
                {Icon}
                <span className="flex-1 text-center truncate">{children}</span>
                <IoMdClose onClick={onClose} className={closeStyles} />
            </div>
        </div>
    );
};

export default Toast;
