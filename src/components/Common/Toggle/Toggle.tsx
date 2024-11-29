export type ToggleProps = {
    isChecked: boolean;
    onToggle: () => void;
};

export const Toggle = ({ isChecked, onToggle }: ToggleProps) => {
    return (
        <div className="relative flex items-center justify-between w-[160px] h-[30px] bg-gray-200 rounded-full p-1">
            <div
                onClick={onToggle}
                className={`absolute w-[78px] h-[30px] bg-gray-100 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isChecked ? 'translate-x-[78px]' : 'translate-x-0'
                }`}
            />
            <div
                onClick={onToggle}
                className={`absolute left-2 font-bold text-sm transform -translate-y-1/2 ${
                    isChecked ? 'text-gray-400' : 'text-black'
                }`}
                style={{ top: '50%' }}
            >
                편지지
            </div>
            <div
                onClick={onToggle}
                className={`absolute right-2 font-bold text-sm transform -translate-y-1/2 ${
                    isChecked ? 'text-black' : 'text-gray-400'
                }`}
                style={{ top: '50%' }}
            >
                글씨체
            </div>
        </div>
    );
};
