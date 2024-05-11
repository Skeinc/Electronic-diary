import { GroupModel } from "./group.model";

export interface StudentModel {
    id: number,
    surname: string | null,
    name: string | null,
    patronymic: string | null,
    email: string | null,
    phone: string | null,
    login: string | null,
    password: string| null,
    groupdID: number | null,
    group: GroupModel | null,
    course: number | null,
};