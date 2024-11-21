import React from 'react';
import Toast from '../Toast/Toast';
import { useToastStore } from '@/hooks/useToastStore';

const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed z-[9999] top-5 right-5 space-y-3">
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
