import { LecturerShortInformationInterface } from "../lecturers/lecturer.interface";
import { SubjectShortInformationInterface } from "../subjects/subject.interface";

export interface ScheduleDayInterface {
    dayOfWeek: string | null;
    schedule: ScheduleLessonInterface[];
};

export interface ScheduleLessonInterface {
    number: number;
    teacher: LecturerShortInformationInterface | null;
    subject: SubjectShortInformationInterface | null;
    cabinet: string | null;
};