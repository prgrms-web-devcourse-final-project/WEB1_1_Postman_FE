import React from 'react';
import { IoIosWarning, IoMdClose } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { MdOutlineError } from 'react-icons/md';

interface ToastProps {
    children: React.ReactNode;
    variant: 'success' | 'warning' | 'error';
    onClose: () => void;
}

const iconStyles = 'w-8 h-8 absolute left-8 top-5';
const closeStyles = 'w-8 h-8 absolute right-8 top-5';

const iconComponents = {
    success: <FaCheck className={iconStyles} />,
    warning: <IoIosWarning className={iconStyles} />,
    error: <MdOutlineError className={iconStyles} />
};

const Toast = ({ children, variant = 'success', onClose }: ToastProps) => {
    const Icon = iconComponents[variant];

    return (
        <div
            className={`relative flex items-center justify-center w-[514px] h-[77px] mb-2 px-5 rounded-lg text-white font-sans font-normal text-[22px] leading-[26px] shadow-md 
            ${
                variant === 'success'
                    ? 'bg-green-500'
                    : variant === 'warning'
                      ? 'bg-red-500'
                      : 'bg-yellow-400'
            }
            animate-toast-slide-in`}
        >
            {Icon}
            <span className="truncate w-[350px] text-center">{children}</span>
            <IoMdClose onClick={onClose} className={closeStyles} />
        </div>
    );
};

export default Toast;
