export const LotteryAnimationContainer = () => {
    return (
        <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-[calc(50%+10px)] rotate-[67deg]">
                <div className="animate-wiggle-more animate-infinite animate-duration-[3000ms] animate-ease-in-out">
                    <img
                        src="/라벨_샘플_01.png"
                        className="h-[120px] aspect-ratio"
                    />
                </div>
            </div>

            <div className="absolute top-[60px] left-1/2 -translate-x-[calc(50%-10px)] -rotate-[75deg]">
                <div className="animate-wiggle-more animate-infinite animate-duration-[3000ms] animate-delay-[0000ms] animate-ease-in-out">
                    <img
                        src="/라벨_샘플_02.png"
                        className="h-[120px] aspect-ratio"
                    />
                </div>
            </div>

            <div className="absolute top-[130px] left-1/2 -translate-x-[calc(50%+10px)] rotate-[75deg]">
                <div className="animate-wiggle-more animate-infinite animate-duration-[3000ms] animate-delay-[0000ms] animate-ease-in-out">
                    <img
                        src="/라벨_샘플_01.png"
                        className="h-[120px] aspect-ratio"
                    />
                </div>
            </div>

            <div className="absolute top-[10px] left-[40px] size-[50px] rounded-full bg-[#ea4444] animate-bounce animate-infinite animate-duration-[1200ms]"></div>

            <div className="absolute top-[60px] right-[60px] size-[30px] rounded-full bg-[#5eb0eb] animate-bounce animate-infinite animate-duration-[1000ms]"></div>

            <div className="absolute top-[180px] right-[100px] size-[40px] rounded-full bg-[#f5c33a] animate-bounce animate-infinite animate-duration-[1500ms]"></div>
        </div>
    );
};
