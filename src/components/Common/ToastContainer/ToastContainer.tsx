import React from 'react';
import Toast from '../Toast/Toast';
import { useToastStore } from '@/hooks/useToastStore';

const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center w-full">
            {toasts
                .slice()
                .reverse()
                .map((toast) => (
                    <Toast
                        key={toast.id}
                        variant={toast.variant}
                        onClose={() => removeToast(toast.id)}
                    >
                        {toast.message}
                    </Toast>
                ))}
        </div>
    );
};

export default ToastContainer;
