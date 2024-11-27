import React from 'react';
import classNames from 'classnames';

interface MarginProps {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    children?: React.ReactNode;
}

const Margin: React.FC<MarginProps> = ({
    top,
    bottom,
    left,
    right,
    children
}) => {
    // Tailwind 클래스 동적 생성
    const marginClasses = classNames({
        [`mt-[${top}px]`]: top,
        [`mb-[${bottom}px]`]: bottom,
        [`ml-[${left}px]`]: left,
        [`mr-[${right}px]`]: right
    });

    return <div className={marginClasses}>{children}</div>;
};

// 기본값 설정
Margin.defaultProps = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    children: null
};

export default Margin;
