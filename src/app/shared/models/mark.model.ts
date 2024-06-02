import { MarkDataInterface } from "@shared/interfaces/marks/mark.interface";

export interface MarkModel {
    studentID: number;
    studentName: string;
    marks: MarkDataInterface[];
};