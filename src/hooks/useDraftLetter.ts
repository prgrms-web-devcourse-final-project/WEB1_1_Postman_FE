import { useLetterDB } from './useLetterDB';
import { useToastStore } from './useToastStore';

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
    const { addToast } = useToastStore();
    const { saveLetter, getLetter } = useLetterDB();

    const loadDraft = async () => {
        try {
            const draft = await getLetter('draft');
            if (draft) {
                setTitle(draft.title);
                setLetter(String(draft.theme));
                setLetterContent(draft.content);
                setFont(draft.font);
            }
        } catch (error) {
            console.error('드래프트 불러오기 실패:', error);
            addToast('임시저장 불러오기 실패', 'error');
        }
    };

    const saveDraft = async () => {
        try {
            await saveLetter({
                id: 'draft',
                title,
                content: letterContent,
                font,
                theme: Number(letter),
                lastModified: new Date()
            });
        } catch (error) {
            console.error('저장 실패:', error);
            addToast('임시저장 실패', 'error');
        }
    };

    return { loadDraft, saveDraft };
};
