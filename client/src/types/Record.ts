export type Record = {
    id: string;
    habit: {
        id: string;
    };
    date: string;
};

export type DailyRecordMap = {
    [id: string]: string | undefined;
};

export type WeekRecordMap = {
    [date: string]: DailyRecordMap;
};
