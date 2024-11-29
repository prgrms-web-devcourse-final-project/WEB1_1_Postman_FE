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
        <div className="relative flex items-center justify-between w-[140px] h-[30px] bg-gray-200 rounded-full p-1">
            <div
                onClick={onToggle}
                className={`absolute w-[78px] h-[30px] bg-gray-100 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isChecked ? 'translate-x-[60px]' : '-translate-x-2'
                }`}
            />
            <div
                onClick={onToggle}
                className={`absolute left-5 font-bold text-sm transform -translate-y-1/2 ${
                    isChecked ? 'text-gray-400' : 'text-black'
                }`}
                style={{ top: '50%' }}
            >
                {leftLabel}
            </div>
            <div
                onClick={onToggle}
                className={`absolute right-5 font-bold text-sm transform -translate-y-1/2 ${
                    isChecked ? 'text-black' : 'text-gray-400'
                }`}
                style={{ top: '50%' }}
            >
                {rightLabel}
            </div>
        </div>
    );
};
