/** 그라디언트 배경을 주는 container */
export const GradientContainer = () => {
    const gradientStyle = {
        background:
            'linear-gradient(to top, #58A1EB 0%, #91CFF8 50%, #C6E6FC 100%)'
    };

    return (
        <div
            className="h-full max-w-[473px] min-w-[375px] w-full absolute"
            style={gradientStyle}
        ></div>
    );
};
