import { Margin } from '@/components/Common/Margin/Margin';
import React from 'react';

export const SuccessModal = () => {
    return (
        <div className="flex flex-col items-center justify-center w-[50%] h-[20%] m-auto text-xl rounded-3xl animate-fade-up bg-slate-200 mt-[55%]">
            <img src="/폭죽.png" className="w-12 h-12" />
            <Margin top={10} />
            <span>성공적으로</span>
            <span>발송되었습니다</span>
        </div>
    );
};
