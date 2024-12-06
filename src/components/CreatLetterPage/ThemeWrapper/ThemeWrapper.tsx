import React from 'react';
import { SkyLetter, FlowerLetter, HeartLetter } from '../Theme/index';
import { match } from 'ts-pattern';

type ThemeWrapperProps = {
    children: React.ReactNode;
    themeId: number;
};

const ThemeWrapperComponent = ({ children, themeId }: ThemeWrapperProps) => {
    const themeComponent = match(themeId)
        .with(1, () => <SkyLetter>{children}</SkyLetter>)
        .with(2, () => <HeartLetter>{children}</HeartLetter>)
        .with(3, () => <FlowerLetter>{children}</FlowerLetter>)
        .otherwise(() => <SkyLetter>{children}</SkyLetter>);

    return <>{themeComponent}</>;
};

const ThemeWrapper = React.memo(ThemeWrapperComponent);
ThemeWrapper.displayName = 'ThemeWrapper';

export { ThemeWrapper };
