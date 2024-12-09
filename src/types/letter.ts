export type LetterType = {
    title: string;
    content: string;
    keywords: string[];
    font: string;
    paper: string;
    label: string;
};

export type MapReplyType = {
    sourceLetter: number;
    content: string;
    font: string;
    paper: string;
    label: string;
};

export type KeywordType = {
    letterId : number;
    content: string;
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

export type CreateKeywordReplyLetterResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        replyLetterId: number;
        content: string;
        font: string;
        paper: string;
        label: string;
        createdAt: string;
    };
};

export type NearbyLettersResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        letterId: number;
        latitude: number;
        longitude: number;
        title: string;
        createdAt: string;
        distance: number;
        target: number;
        createUserNickname: string;
        label: string;
        description: string;
    }[];
};
export type NearbyLettersDetailResponseType = {
    title: string;
    content: string;
    description: string;
    profileImg: string;
    font: string;
    paper: string;
    isOwner: boolean;
    label: string;
    createdAt: string;
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

export type GetKeywordReplyLetterDetailResponseType = {
    replyLetterId: number;
    content: string;
    font: string;
    paper: string;
    label: string;
    createdAt: string;
};

export type GetMapReplyLetterDetailResponseType = {
    sourceLetterId: number;
    content: string;
    font: string;
    paper: string;
    label: string;
    createdAt: string;
    isOwner: boolean;
};

export type getArchivedMapLetterResultType = {
    title: string;
    content: string;
    description: string;
    profileImg: string;
    font: string;
    paper: string;
    label: string;
    createdAt: string;
    isOwner: boolean;
};

export type GetArchivedMapLetterResponseType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: getArchivedMapLetterResultType;
};

export type ReplyList = {
    replyLetterId: number;
    title?: string;
    label: string;
    createdAt: string;
};

export type ReplyListResponseType = {
    content: ReplyList[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};
export type KeywordReplyListProps = {
    keywordReplyListData: ReplyListResponseType[];
};
