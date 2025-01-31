import { LetterListItem } from './LetterListItem';
import { StorageLetterDataType } from '@/types/letter';

type LetterDateGroupProps = {
    date: string;
    letters: StorageLetterDataType[];
    checkedItems: StorageLetterDataType[];
    handleSingleCheck: (
        checked: boolean,
        letter: StorageLetterDataType
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
