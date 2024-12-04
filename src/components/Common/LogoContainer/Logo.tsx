type LogoProps = {
    h?: number;
};

export const Logo = ({ h = 24 }: LogoProps) => {
    const height = `h-[${h}px]`;

    return <img className={`${height}`} src="/logo.svg" alt="" />;
};
