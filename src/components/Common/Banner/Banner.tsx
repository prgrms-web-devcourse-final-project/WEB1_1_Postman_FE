import { ReactNode } from 'react';

type BannerProps = {
    color: 'bg-primary';
    children: ReactNode;
};

export const Banner = ({ color, children }: BannerProps) => {
    return (
        <div className={`flex h-20 rounded-lg shadow transition-all ${color}`}>
            {children}
        </div>
    );
};
