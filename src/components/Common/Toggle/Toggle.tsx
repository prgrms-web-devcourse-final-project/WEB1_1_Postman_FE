export type ToggleProps = {
    isChecked: boolean;
    onToggle: () => void;
};

export const Toggle = ({ isChecked, onToggle }: ToggleProps) => {
    return (
        <div className="relative flex items-center justify-center w-[160px] h-[30px] bg-gray-200 rounded-full p-1">
            <div
                onClick={onToggle}
                className={`absolute w-[78px] h-[30px] bg-gray-100 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isChecked ? 'right-0' : 'left-0'
                }`}
            />
            <div
                onClick={onToggle}
                className={`absolute top-1/2 left-7 cursor-pointer transform -translate-y-1/2 font-bold text-sm ${
                    isChecked ? 'text-gray-400' : 'text-black'
                }`}
            >
                편지지
            </div>
            <div
                onClick={onToggle}
                className={`absolute cursor-pointer top-1/2 left-[85px] transform -translate-y-1/2 font-bold text-sm ${
                    isChecked ? 'text-black' : 'text-gray-400'
                }`}
            >
                글씨체
            </div>
        </div>
    );
};
