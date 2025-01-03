type BoxType = 'SEND' | 'RECEIVE';
type LetterType = 'LETTER' | 'REPLY_LETTER';

interface CategoryProps {
    boxType: BoxType;
    letterType: LetterType;
}

const categoryStyle = 'text-sm';

export const Category = ({ boxType, letterType }: CategoryProps) => {
    const classification = `${boxType}-${letterType}`;
    switch (classification) {
        case 'SEND-LETTER':
            return <div className={categoryStyle}>보낸 편지</div>;
        case 'SEND-REPLY_LETTER':
            return <div className={categoryStyle}>보낸 답장</div>;
        case 'RECEIVE-LETTER':
            return <div className={categoryStyle}>받은 편지</div>;
        case 'RECEIVE-REPLY_LETTER':
            return <div className={categoryStyle}>받은 답장</div>;
        default:
    }
};
