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

export type GetKeywordLetterDetailResponseType = {
    letterId: number;
    title: string;
    content: string;
    keywords: string[];
    font: string;
    paper: string;
    profile: string;
    label: string;
    isOwner: boolean;
    createdAt: string;
};

export type GetRecentRelyResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        type: 'MAP' | 'KEYWORD';
        labelUrl: string;
        letterId: number;
    }[];
};
