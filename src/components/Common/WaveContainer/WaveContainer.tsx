export const WaveContainer = () => {
    return (
        <div className="z-0">
            <img src="/무인도.svg" className="absolute -top-10 right-20" />
            <div className="animate-shake animate-infinite animate-duration-[5000ms] animate-ease-linear bg-[url('/물결.svg')] absolute h-full w-full overflow-auto bg-cover bg-center custom-mask" />
        </div>
    );
};
