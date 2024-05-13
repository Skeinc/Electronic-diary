import { ScheduleDayInterface } from "@shared/interfaces/schedule/schedule.interface";

export interface ScheduleModel {
    groupID?: number;
    data: ScheduleDayInterface[];
}