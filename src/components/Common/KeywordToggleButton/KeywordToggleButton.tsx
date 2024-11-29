type KeywordToggleButtonProps = {
    keyword: string;
    isActive?: boolean;
    onClick: () => void;
};

export const KeywordToggleButton = ({
    keyword,
    isActive = false,
    onClick
}: KeywordToggleButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`border border-gray-600 border-solid rounded-full px-3 py-1 ${isActive ? 'bg-slate-500' : 'bg-white'} ${isActive ? 'text-white' : 'text-black'}`}
        >
            {keyword}
        </button>
    );
};
