import { GroupModel } from "./group.model";
import { LecturerModel } from "./lecturer.model";

export interface SubjectModel {
    id?: number;
    name: string | null;
    code: string | null;
    lecturers: LecturerModel[];
    groups: GroupModel[];
};