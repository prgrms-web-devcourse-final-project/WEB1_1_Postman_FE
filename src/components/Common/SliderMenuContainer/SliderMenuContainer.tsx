import React, { ReactNode } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet'; // 3.5.0-alpha.0 알파버전 사용하지 않으면 오류남
import 'react-spring-bottom-sheet/dist/style.css';

interface SliderMenuContainerProps {
    open?: boolean;
    snapPoints?: () => number[];
    blocking?: boolean;
    children: ReactNode;
}

export const SliderMenuContainer = ({
    open = true,
    snapPoints = () => [window.innerHeight * 0.3, window.innerHeight * 0.6],
    blocking = false,
    children
}: SliderMenuContainerProps) => {
    return (
        <BottomSheet
            open={open} // false면 완전히 닫힘
            snapPoints={snapPoints} // ex) [300, 450, 600]이면 300px, 450px, 600px에서 멈춤
            blocking={blocking} // true면 배경 클릭 불가
        >
            {children}
        </BottomSheet>
    );
};
