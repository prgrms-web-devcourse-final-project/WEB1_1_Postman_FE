type DayCounterProps = {
    width?: string;
    height?: string;
    daysLeft: number;
};

export const DayCounter = ({
    width = '66px',
    height = '30px',
    daysLeft
}: DayCounterProps) => {
    return (
        <div
            className="flex-center p-1 bg-gray-100 rounded-xl"
            style={{ width, height }}
        >
            <span className="font-bold text-xs text-gray-500 text-nowrap">
                D-{daysLeft}
            </span>
        </div>
    );
};
