export interface GroupScheduleInterface {
    name: string;
    data: GroupScheduleDataInterface[];
}

export interface GroupScheduleDataInterface {
    number: number;
    name: string | null;
    cabinet: string | null;
}