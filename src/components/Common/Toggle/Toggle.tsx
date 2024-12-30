import { match } from 'ts-pattern';
import { ToggleVariant } from './constants';

export type ToggleProps = {
    /** 현재 토글의 상태 */
    isChecked: boolean;
    /** 토글의 상태를 변경하는 함수 */
    onToggle: () => void;
    /** 왼쪽 레이블 텍스트 */
    leftLabel: string;
    /** 오른쪽 레이블 텍스트 */
    rightLabel: string;
    /** 토글의 스타일을 결정 ("main | "diary") */
    variant: ToggleVariant;
};

export const Toggle = ({
    isChecked,
    onToggle,
    leftLabel,
    rightLabel,
    variant
}: ToggleProps) => {
    const handleToggle = (onToggle: () => void) => {
        onToggle();
    };

    /** 메인페이지에 사용되는 토글 스타일 입니다. */
    const mainVariantToggleStyle = (
        <div className="relative flex items-center w-fit h-[30px] bg-[rgba(255,255,255,0.5)] rounded-full cursor-pointer shadow-inner">
            <div
                onClick={() => {
                    handleToggle(onToggle);
                }}
                className={`absolute w-1/2 left-0 h-[30px] bg-white rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isChecked ? 'translate-x-full' : 'translate-x-0'
                }`}
            />
            <div
                onClick={() => {
                    handleToggle(onToggle);
                }}
                className={`px-4 text-body1 w-1/2 transform ${
                    isChecked
                        ? 'text-[rgba(92,92,92,0.3)]'
                        : 'text-sample-black'
                }`}
            >
                {leftLabel}
            </div>
            <div
                onClick={() => {
                    handleToggle(onToggle);
                }}
                className={`px-4 text-body1 w-1/2 transform ${
                    isChecked
                        ? 'text-sample-black'
                        : 'text-[rgba(92,92,92,0.3)]'
                }`}
            >
                {rightLabel}
            </div>
        </div>
    );

    /** 일기작성페이지에 사용되는 토글 스타일 입니다. */
    const createDiaryToggleStyle = (
        <div className="relative flex items-center w-fit h-[30px] bg-[#323131] rounded-full z-[1]">
            <div
                onClick={() => {
                    handleToggle(onToggle);
                }}
                className={`absolute w-1/2 left-0 h-[30px] bg-white rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                    isChecked ? 'translate-x-full' : 'translate-x-0'
                }`}
            />
            <div
                onClick={() => {
                    handleToggle(onToggle);
                }}
                className={`px-4 text-sm w-1/2 transform ${
                    isChecked ? 'text-white' : 'text-sample-black'
                }`}
            >
                {leftLabel}
            </div>
            <div
                onClick={() => {
                    handleToggle(onToggle);
                }}
                className={`px-4 text-sm w-1/2 transform ${
                    isChecked ? 'text-sample-black' : 'text-white'
                }`}
            >
                {rightLabel}
            </div>
        </div>
    );

    const toggle = match(variant)
        .with(ToggleVariant.Main, () => mainVariantToggleStyle)
        .with(ToggleVariant.Diary, () => createDiaryToggleStyle)
        .run();

    return toggle;
};
