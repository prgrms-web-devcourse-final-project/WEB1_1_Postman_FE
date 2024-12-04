export type ToggleProps = {
    isChecked: boolean;
    onToggle: () => void;
    leftLabel: string;
    rightLabel: string;
};

export const Toggle = ({
    isChecked,
    onToggle,
    leftLabel,
    rightLabel
}: ToggleProps) => {
    return (
        <div className="relative flex items-center w-fit h-[30px] bg-[#F7FBFE] rounded-full border border-[rgba(34,184,239,0.13)]">
            <div
                onClick={onToggle}
                className={`absolute w-1/2 left-0 h-[30px] bg-[rgb(34,184,239)] rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isChecked ? 'translate-x-full' : 'translate-x-0'
                }`}
            />
            <div
                onClick={onToggle}
                className={`px-4 text-sm w-1/2 transform ${
                    isChecked ? 'text-gray-400' : 'text-white'
                }`}
            >
                {leftLabel}
            </div>
            <div
                onClick={onToggle}
                className={`px-4 text-sm w-1/2 transform ${
                    isChecked ? 'text-white' : 'text-gray-400'
                }`}
            >
                {rightLabel}
            </div>
        </div>
    );
};
