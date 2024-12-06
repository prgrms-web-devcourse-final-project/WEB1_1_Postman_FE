import { formatDate } from '@/util/formatDate';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { Margin } from '@/components/Common/Margin/Margin';
import { KeywordList } from '../Keyword/KeywordList';
import { DeleteButton } from '../Delete/DeleteButton';
import clsx from 'clsx';

type KeywordLetterDetailProps = {
    letterData: {
        letterId: number;
        title: string;
        content: string;
        keywords: string[];
        createdAt: string;
        font: string;
    };
};

export const KeywordLetterDetail = ({
    letterData
}: KeywordLetterDetailProps) => {
    const { letterId, title, content, keywords, createdAt, font } = letterData;
    return (
        <div className={clsx(font ? font : 'font-sans')}>
            <Margin top={20} />
            <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                <div className="absolute top-0 right-0">
                    <DeleteButton id={String(letterId)} />
                </div>
                <h1>{title}</h1>
                <img src={'/to_line.f4c129e6.svg'} className="w-full" />

                <div className="relative">
                    <TextArea value={content} font={font} isReadonly={true} />
                </div>

                <Margin top={30} />
                <div className="flex justify-between w-full ">
                    <p className="font-bold ">편지의 키워드</p>
                    <p className="">{formatDate(createdAt)}</p>
                </div>
                <KeywordList keywords={keywords} />
                <Margin bottom={30} />
            </div>
        </div>
    );
};
