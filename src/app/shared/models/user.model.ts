// TODO: переписать модель пользователя
export interface UserModel {
    id: number;
    name?: string;
    surname?: string;
    patronymic?: string;
    login?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: string;
    id_media?: string | null;
    groupCode?: string;
    groupID?: number;
    accStatus?: number;
}