type DayCounterProps = {
    width?: string;
    height?: string;
};

export const DayCounter = ({
    width = '66px',
    height = '43px'
}: DayCounterProps) => {
    const daysLeft = 21;

    return (
        <div
            className="flex-center p-4 bg-gray-200 rounded-3xl"
            style={{ width, height }}
        >
            <span className="font-bold text-m text-gray-500">D-{daysLeft}</span>
        </div>
    );
};
