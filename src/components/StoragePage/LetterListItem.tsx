import { BottleLetter } from '@/components/Common/BottleLetter/BottleLetter';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    DeleteLetterType,
    StorageKeywordLetter,
    StorageLetterDataType,
    StorageMapArchivedLetter,
    StorageMapReceivedLetter,
    StorageMapSentLetter
} from '@/types/letter';
import { Category } from '../Common/LetterListItem/Category';

export const ASSETS = {
    LOCATION: '/src/assets/Location.svg',
    RIGHT_ARROW: '/src/assets/rightArrow.svg'
} as const;

type LetterListItemProps = {
    letter: StorageLetterDataType;
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
    const { selectedLetterType } = useParams();
    const [searchParams] = useSearchParams();
    const filterType = searchParams.get('filtertype');

    const getNavigatePath = (letter: StorageLetterDataType) => {
        switch (selectedLetterType) {
            case 'keyword':
                return `/letter/keyword/${letter.letterType}/${filterType}/${letter.letterId}`;
            case 'map':
                return `/letter/map/${filterType}/${letter.letterId}`;
            case 'bookmark':
                return `/letter/map/bookmark/${letter.letterId}`;
            default:
                throw new Error(
                    `Unsupported letter type: ${selectedLetterType}`
                );
        }
    };

    const renderListContent = () => {
        switch (selectedLetterType) {
            case 'keyword': {
                const keywordLetter = letter as StorageKeywordLetter;
                return (
                    <>
                        <Category
                            boxType={keywordLetter.boxType}
                            letterType={keywordLetter.letterType}
                        />
                        <h3 className="font-bold text-md">
                            {keywordLetter.title}
                        </h3>
                    </>
                );
            }
            case 'map': {
                const mapLetter = letter as
                    | StorageMapSentLetter
                    | StorageMapReceivedLetter;

                const getUserNicknameLabel = (
                    letter: StorageMapSentLetter | StorageMapReceivedLetter
                ) => {
                    if (letter.type === 'PUBLIC') return '';
                    // Target
                    const prefix =
                        'targetUserNickname' in letter ? 'To.' : 'From.';
                    const nickname =
                        'targetUserNickname' in letter
                            ? letter.targetUserNickname
                            : letter.senderNickname;

                    return nickname ? `${prefix} ${nickname}` : '';
                };
                return (
                    <>
                        <div className="text-sm">
                            {getUserNicknameLabel(mapLetter)}
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <h3 className="font-bold text-md">
                                {letter.title}
                            </h3>
                        </div>
                        <div className="flex flex-row gap-1">
                            <img src="/src/assets/Location.svg"></img>
                            <div className="text-sm">
                                서울특별시 동대문구 어디어디
                            </div>
                        </div>
                    </>
                );
            }
            case 'bookmark': {
                const bookmarkLetter = letter as StorageMapArchivedLetter;
                return (
                    <>
                        <h3 className="font-bold text-md">
                            {bookmarkLetter.title}
                        </h3>
                        <div>샘플 위치가 들어갑니다.</div>
                    </>
                );
            }
        }
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
                <div className="flex flex-row items-center w-full gap-4">
                    <div className="w-[67px] h-[67px] p-2 bg-white rounded-full">
                        <BottleLetter Letter={letter} />
                    </div>
                    <div className="flex flex-col h-full">
                        {renderListContent()}
                    </div>
                </div>
                <img src={ASSETS.RIGHT_ARROW} />
            </div>
        </div>
    );
};
