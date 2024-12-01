import { useEffect, useState } from 'react';

/**
 * 디바운스 관련 함수입니다.
 * @param value 딜레이를 적용할 대상 텍스트입니다.
 * @param delay 딜레이 시간을 설정합니다.
 * @returns
 */
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [delay, value]);

    return debouncedValue;
}

export default useDebounce;
