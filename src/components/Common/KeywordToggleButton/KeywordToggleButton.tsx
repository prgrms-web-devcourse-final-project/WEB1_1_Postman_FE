type KeywordToggleButtonProps = {
    keyword: string;
    isActive?: boolean;
    onClick?: () => void;
};

export const KeywordToggleButton = ({
    keyword,
    isActive = false,
    onClick
}: KeywordToggleButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`border-[1px] border-sample-blue border-solid rounded-full px-3 py-1 text-black ${isActive && 'bg-[rgba(34,171,239,0.13)]'}`}
        >
            {keyword}
        </button>
    );
};
