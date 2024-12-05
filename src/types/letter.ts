export type LetterType = {
    title: string;
    content: string;
    keywords: string[];
    font: string;
    paper: string;
    label: string;
};

export type CreateLetterResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        letterId: number;
        title: string;
        content: string;
        keywords: string[];
        font: string;
        paper: string;
        profile: string;
        label: string;
        createdAt: string;
    };
};
