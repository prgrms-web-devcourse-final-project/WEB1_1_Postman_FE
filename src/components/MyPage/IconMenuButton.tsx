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
            className="bg-sample-gray rounded-md flex flex-col items-center px-4 py-2 cursor-pointer"
            onClick={onClick}
        >
            <img className="w-[24px] h-[24px]" src={iconUrl} />
            <div className="text-body2">{content}</div>
        </div>
    );
};
