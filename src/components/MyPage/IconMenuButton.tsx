type IconMenuProps = {
    onClick: () => void;
    iconUrl: string;
    content: string;
};

export const IconMenuButton = ({
    onClick,
    iconUrl,
    content
}: IconMenuProps) => {
    return (
        <div
            className="bg-gray-200 rounded-md flex flex-col items-center p-2 cursor-pointer"
            onClick={onClick}
        >
            <img className="w-[24px] h-[24px]" src={iconUrl} />
            {content}
        </div>
    );
};
