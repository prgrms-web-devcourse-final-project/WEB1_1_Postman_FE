export type LetterType = {
    title: string;
    content: string;
    keywords: string[];
    font: string;
    paper: string;
    label: string;
};

export type storageLetterType = 'keyword' | 'map' | 'bookmark';
export type ApiBoxType = 'SEND' | 'RECEIVE';
export type ApiLetterType = 'LETTER' | 'REPLY_LETTER';

export type DeleteKeywordLetterType = {
    letterId: number;
    letterType: string;
    boxType: string;
};

export type DeleteMapLetterType = {
    letterId: number;
    letterType: string;
};

export type DeleteBookmarkLetterType = {
    archiveIds: number;
};

export type DeleteLetterType =
    | DeleteKeywordLetterType
    | DeleteMapLetterType
    | DeleteBookmarkLetterType;

export interface BaseLetter {
    letterId: number;
    title: string;
    label: string;
    letterType: ApiLetterType;
    boxType: ApiBoxType;
    createdAt: string;
}

export interface StorageKeywordLetter extends BaseLetter {
    keywords?: string[]; // TODO : 키워드 관련 특수 필드 요청
}

export interface StorageMapSentLetter extends BaseLetter {
    description: string;
    targetUserNickname: string;
    type: string;
    sourceLetterId: number;
    deleteType: string;
}

export interface StorageMapReceivedLetter extends BaseLetter {
    description: string;
    latitude: number;
    longitude: number;
    type: string;
    sourceLetterId: number;
    senderNickname: string;
    senderProfileImg: string;
    deleteType: string;
}

export interface StorageMapArchivedLetter extends BaseLetter {
    archiveId: number;
    description: string;
    latitude: number;
    longitude: number;
    letterCreatedAt: string;
}

export type StorageLetterDataType =
    | StorageKeywordLetter
    | StorageMapSentLetter
    | StorageMapReceivedLetter
    | StorageMapArchivedLetter;

export type MapReplyType = {
    sourceLetter: number;
    content: string;
    font: string;
    paper: string;
    label: string;
};

export type KeywordType = {
    letterId: number;
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
    isReplied: boolean;
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
