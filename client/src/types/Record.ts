export type Record = {
    id: string;
    habit: {
        id: string;
    };
    date: string;
};

export type RecordMap = {
    [id: string]: string | undefined;
};
