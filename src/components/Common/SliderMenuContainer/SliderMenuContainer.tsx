import React, { ReactNode } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet'; // 3.5.0-alpha.0 알파버전 사용하지 않으면 오류남
import 'react-spring-bottom-sheet/dist/style.css';

interface SliderMenuContainerProps {
    open?: boolean;
    snapPoints?: () => number[];
    onDismiss?: () => void;
    blocking?: boolean;
    useDefaultSnap?: boolean;
    children: ReactNode;
    header?: ReactNode;
}

export const SliderMenuContainer = ({
    open = true,
    snapPoints = () => [window.innerHeight * 0.3, window.innerHeight * 0.6],
    onDismiss,
    blocking = false,
    useDefaultSnap = false,
    children,
    header
}: SliderMenuContainerProps) => {
    return (
        <BottomSheet
            open={open} // false면 완전히 닫힘
            onDismiss={onDismiss}
            snapPoints={snapPoints} // ex) [300, 450, 600]이면 300px, 450px, 600px에서 멈춤
            defaultSnap={
                useDefaultSnap ? ({ snapPoints }) => snapPoints[0] : undefined
            }
            blocking={blocking} // true면 배경 클릭 불가
            className="z-[999]" // z-index 추가
            style={
                {
                    '--rsbs-z-index': '999'
                } as React.CSSProperties
            }
            header={header}
        >
            {children}
        </BottomSheet>
    );
};
