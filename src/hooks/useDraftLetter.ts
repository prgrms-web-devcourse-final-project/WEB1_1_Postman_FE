import { useLetterDB } from './useLetterDB';

export const useDraftLetter = (
    title: string,
    letter: string,
    letterContent: string,
    font: string,
    setTitle: (title: string) => void,
    setLetter: (letter: string) => void,
    setLetterContent: (content: string) => void,
    setFont: (font: string) => void
) => {
    const { saveLetter, getLetter } = useLetterDB();

    const loadDraft = async () => {
        const draft = await getLetter('draft');
        if (draft) {
            setTitle(draft.title);
            setLetter(String(draft.theme));
            setLetterContent(draft.content);
            setFont(draft.font);
        }
    };

    const saveDraft = async () => {
        await saveLetter({
            id: 'draft',
            title,
            content: letterContent,
            font,
            theme: Number(letter),
            lastModified: new Date()
        });
    };

    return { loadDraft, saveDraft };
};
