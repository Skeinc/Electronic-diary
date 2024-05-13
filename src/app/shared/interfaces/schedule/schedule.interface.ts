export interface ScheduleDayInterface {
    dayOfWeek: string | null;
    schedule: ScheduleLessonInterface[];
};

export interface ScheduleLessonInterface {
    number: number;
    teacherID?: number | null;
    teacherName?: string | null;
    subjectID?: number | null;
    subjectName?: string | null;
    cabinet: string | null;
};