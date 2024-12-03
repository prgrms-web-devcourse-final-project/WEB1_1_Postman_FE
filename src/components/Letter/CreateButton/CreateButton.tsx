import React from 'react';

type CreateButtonProps = {
    isActive: boolean;
    handleClickHandler: () => void;
};

export const CreateButton = ({
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
                className={`border m-auto text-xl w-[95%] h-[51px] rounded-3xl  bottom-24 ${
                    isActive
                        ? 'bg-slate-500 text-white'
                        : 'bg-slate-200 text-black'
                }`}
                type="button"
            >
                Button
            </button>
        </div>
    );
};
