import { LetterListItem } from './LetterListItem';
import { DeleteLetterType } from '@/types/letter';

interface Letter {
    letterId: number;
    title: string;
    label: string;
    letterType: string;
    boxType: string;
    createdAt: string;
}

type LetterDateGroupProps = {
    date: string;
    letters: Letter[];
    checkedItems: DeleteLetterType[];
    handleSingleCheck: (
        checked: boolean,
        { letterId, letterType, boxType }: DeleteLetterType
    ) => void;
};

export const LetterDateGroup = ({
    date,
    letters,
    checkedItems,
    handleSingleCheck
}: LetterDateGroupProps) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="font-medium text-md">{date}</div>
            <div className="flex flex-col gap-2">
                {letters.map((letter) => (
                    <LetterListItem
                        key={letter.letterId}
                        letter={letter}
                        checked={checkedItems.some(
                            (item) => item.letterId === letter.letterId
                        )}
                        handleSingleCheck={handleSingleCheck}
                    />
                ))}
            </div>
        </div>
    );
};
