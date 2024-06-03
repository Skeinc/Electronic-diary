import { AttendanceDataInterface } from "@shared/interfaces/attendance/attendance.interface";

export interface AttendanceModel {
    studentID: number;
    studentName: string;
    attendance: AttendanceDataInterface[];
};