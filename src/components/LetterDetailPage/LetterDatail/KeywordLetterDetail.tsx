import { formatDate } from '@/util/formatDate';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { Margin } from '@/components/Common/Margin/Margin';
import { KeywordList } from '../Keyword/KeywordList';

type KeywordLetterDetailProps = {
    letterData: {
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
    const { title, content, keywords, createdAt, font } = letterData;
    return (
        <>
            <Margin top={20} />
            <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                <h1 style={{ fontFamily: font }}>{title}</h1>
                <img src={'/to_line.f4c129e6.svg'} className="w-full" />

                <div className="relative">
                    <TextArea value={content} font={font} isReadonly={true} />
                </div>
                <Margin top={30} />
                <div className="flex justify-between w-full">
                    <KeywordList keywords={keywords} font={font} />
                    <p className="">{formatDate(createdAt)}</p>
                </div>
                <Margin bottom={30} />
            </div>
        </>
    );
};
