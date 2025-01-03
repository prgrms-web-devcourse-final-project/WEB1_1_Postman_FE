import { LetterListItem } from './LetterListItem';
import { DeleteLetterType, StorageLetterDataType } from '@/types/letter';

type LetterDateGroupProps = {
    date: string;
    letters: StorageLetterDataType[];
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
