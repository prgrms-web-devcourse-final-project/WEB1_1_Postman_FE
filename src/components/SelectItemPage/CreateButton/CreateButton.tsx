import React, { ReactNode } from 'react';

type CreateButtonProps = {
    children: ReactNode;
    isActive: boolean;
    handleClickHandler: () => void;
};

export const CreateButton = ({
    children,
    isActive,
    handleClickHandler
}: CreateButtonProps) => {
    const handleClick = () => {
        handleClickHandler();
    };

    return (
        <div className="flex items-center justify-center ">
            <button
                onClick={handleClick}
                className={`border m-auto text-xl w-[95%] h-[51px] rounded-3xl  
                    ${isActive ? 'bg-sample-blue text-white hover:bg-sample-hoverblue' : 'bg-sample-gray text-sample-textgray'}`}
                type="button"
            >
                {children}
            </button>
        </div>
    );
};
