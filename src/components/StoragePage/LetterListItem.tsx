import { Itembox } from '@/components/Common/Itembox/Itembox';
import { BottleLetter } from '@/components/Common/BottleLetter/BottleLetter';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { DeleteLetterType, storageLetterType } from '@/types/letter';
import { match } from 'ts-pattern';

interface Letter {
    letterId: number;
    title: string;
    label: string;
    letterType: string;
    boxType: string;
    createdAt: string;
}

type LetterListItemProps = {
    letter: Letter;
    checked: boolean;
    handleSingleCheck: (
        checked: boolean,
        { letterId, letterType, boxType }: DeleteLetterType
    ) => void;
};

export const LetterListItem = ({
    letter,
    checked,
    handleSingleCheck
}: LetterListItemProps) => {
    const navigate = useNavigate();

    const { letterType } = useParams();
    const [searchParams] = useSearchParams();
    const filterType = searchParams.get('filtertype');

    const renderCategory = (boxType: string, letterType: string) => {
        const condition = `${boxType}-${letterType}`;
        switch (condition) {
            case 'SEND-LETTER':
                return '보낸 편지';
            case 'SEND-REPLY_LETTER':
                return '보낸 답장';
            case 'RECEIVE-LETTER':
                return '받은 편지';
            case 'RECEIVE-REPLY_LETTER':
                return '받은 답장';
            default:
        }
    };

    const getNavigatePath = (letter: Letter) => {
        return match<storageLetterType>(letterType as storageLetterType)
            .with(
                'keyword',
                () =>
                    `/letter/keyword/${letter.letterType}/${filterType}/${letter.letterId}`
            )
            .with('map', () => `/letter/map/${filterType}/${letter.letterId}`)
            .with(
                'bookmark',
                () => `/letter/map/${filterType}/bookmark/${letter.letterId}`
            )
            .exhaustive();
    };

    return (
        <div key={letter.letterId} className="flex flex-row gap-2">
            <input
                type="checkbox"
                name={`select-${letter.letterId}`}
                onChange={(e) =>
                    handleSingleCheck(e.target.checked, {
                        letterId: letter.letterId,
                        letterType: letter.letterType,
                        boxType: letter.boxType
                    })
                }
                checked={checked}
            />
            <div
                className="flex flex-row gap-4 w-full h-[90px] items-center p-4 rounded-lg bg-sample-gray cursor-pointer"
                onClick={() => navigate(getNavigatePath(letter))}
            >
                <Itembox>
                    <BottleLetter Letter={letter} />
                </Itembox>
                <div className="flex flex-col h-full">
                    <div className="text-[12px] text-gray-500 mt-2">
                        {renderCategory(letter.boxType, letter.letterType)}
                    </div>
                    <h3 className="text-sm font-bold">{letter.title}</h3>
                </div>
            </div>
        </div>
    );
};
