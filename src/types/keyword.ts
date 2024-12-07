export type KeywordProps = {
    content: string;
};

export type GetAllKeywordType = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        categories: {
            category: string;
            keywords: string[];
        }[];
    };
};

export type KeywordCategoryType = {
    category: string;
    keywords: string[];
};
